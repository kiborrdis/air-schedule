/* eslint-disable class-methods-use-this */

const SINGLE_REQUEST_PAGE_LIMIT = 10;

function flattenObject(obj, parentKey, flattenedObject = {}) {
  Object.keys(obj).forEach((key) => {
    if (!(obj[key] instanceof Object)) {
      flattenedObject[parentKey ? `${parentKey}.${key}` : key] = obj[key];

      return;
    }

    flattenObject(obj[key], parentKey ? `${parentKey}.${key}` : key, flattenedObject);
  });

  return flattenedObject;
}

// TODO handle rate limit response status
export default class TMDBConnector {
  constructor(rootUrl, apiKey) {
    this.rootUrl = rootUrl;
    this.apiKey = apiKey;
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
  }

  // 'Content-Type': 'application/json'
  async sendRequest(path = '', method = 'GET', params = {}, options = { }) {
    let finalURL = `${this.rootUrl}${path}`;
    const finalParams = { ...params, api_key: this.apiKey };
    const flattenedParams = flattenObject(finalParams);

    if (method === 'GET') {
      finalURL += `?${Object.keys(flattenedParams).reduce((memo, key) => {
        memo.push(`${key}=${flattenedParams[key]}`);

        return memo;
      }, []).join('&')}`;
    }

    let result = await fetch(finalURL, { method, headers: this.headers }).then(this.responseToJson);

    if (options.paginated) {
      const rawPages = await this.requestFollowupPages(result, path, method, params, options);

      result = this.concatPaginatedRequest(rawPages);
    }

    return this.onSuccess(result);
  }

  requestFollowupPages = (firstPageResult, path, method, params, options) => {
    const { allPages = true } = options;

    if (!allPages || firstPageResult.page !== 1) {
      return [firstPageResult];
    }

    const pagesToLoad = Array
      .from(Array(Math.min(SINGLE_REQUEST_PAGE_LIMIT, firstPageResult.total_pages - 1)).keys())
      .map(number => number + 2);

    return Promise
      .all([
        firstPageResult,
        ...pagesToLoad.map(
          pageNumber => this.sendRequest(
            path,
            method,
            { ...params, page: pageNumber },
            { ...options, paginated: false },
          ),
        ),
      ]);
  };

  concatPaginatedRequest(resultArray) {
    const defaultResult = {
      page: [],
      results: [],
      total_pages: resultArray[0].total_pages,
      total_results: resultArray[0].total_results,
    };

    return resultArray.reduce((memo, result) => {
      memo.page.push(result.page);

      memo.results = [...memo.results, ...result.results];

      return memo;
    }, defaultResult);
  }

  responseToJson(response) {
    return response.json();
  }

  onSuccess = response => response;

  onFailure = () => {

  };
}

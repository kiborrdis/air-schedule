import { normalize } from 'normalizr';

const identity = input => input;

function parameterizePath(path, params) {
  return path.replace(/:[a-zA-Z0-9]*/g, (match) => {
    const paramName = match.slice(1);

    if (!params[paramName]) {
      console.error(`Parameter ${match} for api path ${path} is not set`);
    }

    const paramValue = params[paramName];

    delete params[paramName];

    return paramValue;
  });
}

function extractMetadata({ rawResult, ...rest }) {
  const metadata = {
    total_pages: rawResult.total_pages,
    total_results: rawResult.total_results,
    pages: rawResult.page,
  };

  return {
    ...rest,
    rawResult,
    metadata,
  };
}

function createResultNormalizer(extractDataForNormalization, resource) {
  return ({ rawResult, ...rest }) => {
    const dataToNormalize = extractDataForNormalization(rawResult);
    const normalized = normalize(
      dataToNormalize,
      Array.isArray(dataToNormalize) ? [resource.entity] : resource.entity,
    );

    return {
      ...rest,
      rawResult,
      normalizedResources: normalized.entities,
      result: normalized.result,
    };
  };
}

function createMethod(method, path, connector, {
  transformInputToParams = identity,
  paginated = false,
}) {
  return (input = {}, options) => {
    const params = { ...transformInputToParams(input) };
    const parameterizedPath = parameterizePath(path, params);

    return connector.sendRequest(
      parameterizedPath,
      method,
      params,
      { ...options, paginated },
    ).then(result => ({
      rawResult: result,
    }));
  };
}

export function createGetMethod(path, connector, resource, {
  extractDataForNormalization = identity,
  ...restOptions
} = {}) {
  const normalizeResult = createResultNormalizer(extractDataForNormalization, resource);
  const sendRequest = createMethod('GET', path, connector, restOptions);

  return (...args) => sendRequest(...args)
    .then(normalizeResult)
    .then(extractMetadata);
}

export function createPostMethod(path, connector, resource, {
  extractDataForNormalization = identity,
  ...restOptions
} = {}) {
  const normalizeResult = createResultNormalizer(extractDataForNormalization, resource);
  const sendRequest = createMethod('POST', path, connector, restOptions);

  return (...args) => sendRequest(...args)
    .then(normalizeResult);
}

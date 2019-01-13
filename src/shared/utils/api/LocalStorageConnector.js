/* eslint-disable class-methods-use-this */

export default class LocalStorageConnector {
  static routes = {
    'shows/scores': {
      get: () => {
        const currentScores = JSON.parse(window.localStorage.getItem('showsScores') || '{}');

        return Object.keys(currentScores).map(id => (
          { id, score: !currentScores[id] ? 0 : currentScores[id] }
        ));
      },
      post: (sentScores) => {
        const currentScores = JSON.parse(window.localStorage.getItem('showsScores') || '{}');

        const newScores = Object.keys(sentScores).reduce(
          (memo, id) => (
            { ...memo, [id]: currentScores[id] === sentScores[id] ? undefined : sentScores[id] }
          ),
          {},
        );

        window.localStorage.setItem(
          'showsScores',
          JSON.stringify({ ...currentScores, ...newScores }),
        );

        return Object.keys(newScores).map(id => (
          { id, score: !newScores[id] ? 0 : newScores[id] }
        ));
      },
    },
  };

  constructor(rootUrl) {
    this.rootUrl = rootUrl;
  }

  sendRequest(path = '', method = 'GET', params) {
    return new Promise((resolve) => {
      const result = LocalStorageConnector.routes[path][method.toLowerCase()](params);

      resolve(result);
    }).then(this.onSuccess, this.onFailure);
  }

  responseToJson(response) {
    return response.json();
  }

  onSuccess = response => response;

  onFailure = (e) => {
    throw e;
  };
}

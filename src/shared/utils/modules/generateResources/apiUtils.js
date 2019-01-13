export function getResourcesFromApi(api) {
  return Object.keys(api.resources).map(key => api.resources[key]);
}

export function getMethodsFromApi(api, path = '', memo = {}) {
  const routesKeys = Object.keys(api);

  if (api.get) {
    memo[`${path}|get`] = api.get;
  }

  if (api.post) {
    memo[`${path}|post`] = api.post;
  }

  routesKeys.forEach((key) => {
    const route = api[key];

    if (route instanceof Function || key[0] === '_') {
      return;
    }

    getMethodsFromApi(route, `${path}/${key}`, memo);
  });

  return memo;
}

export function getActionDescriptorNamesFromMethodPath(methodPath, method) {
  const [urlPath, methodName] = methodPath.split('|');
  const baseActionName = `${methodName.toUpperCase()}${urlPath.replace(/\/([a-zA-Z])/g, '_$1').toUpperCase()}`;
  const actions = [
    `${REDUX_ACTIONS_PREFIX}${baseActionName}_REQUEST`,
    `${REDUX_ACTIONS_PREFIX}${baseActionName}_SUCCESS`,
    `${REDUX_ACTIONS_PREFIX}${baseActionName}_FAILURE`,
  ];
  const creatorName = `${methodName}${urlPath.replace(/\/([a-zA-Z])/g, match => match[1].toUpperCase())}`;
  const options = { paginated: method.paginated };

  return {
    actions,
    baseActionName,
    creatorBaseName: creatorName,
    resourceName: method.resourceName,
    options,
  };
}

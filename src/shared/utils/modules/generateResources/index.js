import { combineReducers } from 'redux';
import { createRequestReducer } from './requestReducer';
import { createResourceReducer } from './resourceReducer';
import { createActionCreator } from './creators';
import { createBootstrapSaga, createRequestSaga } from './sagas';
import * as selectors from './selectors';
import { getResourcesFromApi, getMethodsFromApi, getActionDescriptorNamesFromMethodPath } from './apiUtils';

export default function generateReduxResourcesUsingApi(api) {
  const resources = getResourcesFromApi(api);
  const methods = getMethodsFromApi(api);

  const methodsDescriptor = Object.keys(methods).reduce((memo, methodPath) => {
    memo[methodPath] = getActionDescriptorNamesFromMethodPath(methodPath, methods[methodPath]);

    return memo;
  }, {});

  const creators = Object.keys(methodsDescriptor).reduce((memo, key) => {
    const {
      actions: [requestAction, successAction, failureAction],
      actions,
      resourceName,
    } = methodsDescriptor[key];

    memo[key] = [
      createActionCreator(requestAction, actions, resourceName),
      createActionCreator(successAction, actions, resourceName),
      createActionCreator(failureAction, actions, resourceName),
    ];

    return memo;
  }, {});

  const resourcesReducer = combineReducers(
    resources.reduce((memo, resource) => {
      memo[resource.name] = createResourceReducer(resource.name);

      return memo;
    }, {}),
  );

  const requestsReducer = createRequestReducer(methodsDescriptor);

  const methodsSagas = Object.keys(methods).map(key => ({
    saga: createRequestSaga(
      methods[key],
      creators[key],
    ),
    actionType: methodsDescriptor[key].actions[0],
  }));

  return {
    selectors,
    resources: { ...api.resources },
    saga: createBootstrapSaga(methodsSagas),
    requestsReducer,
    resourcesReducer,
    creators: Object.keys(creators).reduce((memo, key) => {
      const [requestCreator, successCreator, failureCreator] = creators[key];

      memo[`${methodsDescriptor[key].creatorBaseName}`] = requestCreator;
      memo[`${methodsDescriptor[key].creatorBaseName}Success`] = successCreator;
      memo[`${methodsDescriptor[key].creatorBaseName}Failure`] = failureCreator;

      return memo;
    }, {}),
  };
}

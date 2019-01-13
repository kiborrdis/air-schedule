import omit from 'lodash/omit';
import { ADD_RESOURCES, REMOVE_RESOURCES } from './actionTypes';

export function createActionCreator(action, connectedActions, resourceName) {
  return (payload, options) => ({
    type: action,
    payload,
    options,
    meta: {
      connectedActions: omit(connectedActions, action),
      resourceName,
    },
  });
}

export function addResources(normalizedResources) {
  return {
    type: ADD_RESOURCES,
    payload: normalizedResources,
  };
}

export function removeResources(resoursesIds) {
  return {
    type: REMOVE_RESOURCES,
    payload: resoursesIds,
  };
}

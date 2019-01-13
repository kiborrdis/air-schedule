/* eslint-disable import/prefer-default-export */

import { ADD_RESOURCES, REMOVE_RESOURCES } from './actionTypes';

function mergeResources(oldResources, newResources = {}) {
  const mergedNewResources = Object.keys(newResources).reduce((memo, key) => {
    memo[key] = { ...oldResources[key], ...newResources[key] };

    return memo;
  }, {});

  return { ...oldResources, ...mergedNewResources };
}

function markRemovedResources(resources, idsToRemove) {
  const newResources = idsToRemove.reduce((memo, key) => {
    memo[key] = { ...resources[key], removed: true };

    return memo;
  }, {});

  return { ...resources, ...newResources };
}

export function createResourceReducer(resourceName) {
  return (store = {}, { type, payload }) => {
    switch (type) {
      case ADD_RESOURCES:
        return mergeResources(store, payload[resourceName]);

      case REMOVE_RESOURCES:
        return markRemovedResources(store, payload[resourceName]);

      default:
        return store;
    }
  };
}

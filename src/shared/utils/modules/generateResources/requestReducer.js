import { combineReducers } from 'redux';
import objectToString from './objectToString';

export function getDefaultRequestStatus() {
  return {
    fulfilled: false,
    loadedAt: null,
    loading: false,
    errored: false,
    lastError: null,
    invalidated: false,
  };
}

function transformMethodActions(methodsActions) {
  return Object.keys(methodsActions).reduce(
    (memo, key) => {
      const { actions, options } = methodsActions[key];

      memo.requestActions[actions[0]] = { paginated: options.paginated };
      memo.successActions[actions[1]] = { paginated: options.paginated };
      memo.failureActions[actions[2]] = { paginated: options.paginated };

      return memo;
    },
    { requestActions: {}, successActions: {}, failureActions: {} },
  );
}

const createStatusReducer = (
  requestActions, successActions, failureActions,
) => (state = {}, action) => {
  const { type } = action;

  if (requestActions[type]) {
    const requestId = objectToString(action);

    return {
      ...state,
      [requestId]: {
        ...(state[requestId] || getDefaultRequestStatus()),
        loading: true,
      },
    };
  } if (successActions[type]) {
    const requestId = objectToString(action.options.requestAction);

    return {
      ...state,
      [requestId]: {
        ...state[requestId],
        fulfilled: true,
        loadedAt: new Date().getTime(),
        loading: false,
        invalidated: false,
        errored: false,
      },
    };
  } if (failureActions[type]) {
    const requestId = objectToString(action.options.requestAction);

    return {
      ...state,
      [requestId]: {
        ...state[requestId],
        // TODO add last error
        lastError: 'something went wrong',
        errored: true,
      },
    };
  }

  return state;
};

const createResultReducer = (
  requestActions, successActions,
) => (state = {}, action) => {
  const { type } = action;

  if (successActions[type]) {
    const requestId = objectToString(action.options.requestAction);

    return {
      ...state,
      [requestId]: { ...action.payload },
    };
  }

  return state;
};

export function createRequestReducer(methodsActions) {
  const { requestActions, successActions, failureActions } = transformMethodActions(methodsActions);

  return combineReducers({
    status: createStatusReducer(requestActions, successActions, failureActions),
    result: createResultReducer(requestActions, successActions, failureActions),
  });
}

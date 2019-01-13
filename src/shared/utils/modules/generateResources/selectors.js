import objectToString from './objectToString';
import { getDefaultRequestStatus } from './requestReducer';

export function getRequestStatus(state, action) {
  const requestId = objectToString(action);

  return state.status[requestId] || getDefaultRequestStatus();
}

export function getRequestResult(state, action) {
  const requestId = objectToString(action);

  return state.result[requestId] || null;
}

export function getRequestId(action) {
  return objectToString(action);
}

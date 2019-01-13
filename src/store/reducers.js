import { combineReducers } from 'redux';
import { resourcesReducer, requestsReducer } from 'shared/modules/resources';
import countReducer from 'shared/modules/count';

export default combineReducers({
  test: () => ({}),
  resources: resourcesReducer,
  requests: requestsReducer,
  count: countReducer,
});

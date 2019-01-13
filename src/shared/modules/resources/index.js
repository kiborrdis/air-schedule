import api from '../../api';
import generateReduxResourcesUsingApi from '../../utils/modules/generateResources';

const {
  creators, saga, requestsReducer, resourcesReducer, resources, selectors: {
    getRequestStatus,
    getRequestResult,
    getRequestId,
  },
} = generateReduxResourcesUsingApi(api);

console.log('creators', creators);

export {
  creators,
  saga,
  requestsReducer,
  resourcesReducer,
  resources,
  getRequestStatus,
  getRequestResult,
  getRequestId,
};

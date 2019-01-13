import {
  call, put, takeEvery,
} from 'redux-saga/effects';
import { addResources } from './creators';

export function createBootstrapSaga(sagasToBootstrap) {
  return function* bootstrapSaga() {
    for (let i = 0; i < sagasToBootstrap.length; i += 1) {
      yield takeEvery(sagasToBootstrap[i].actionType, sagasToBootstrap[i].saga);
    }
  };
}

export function createRequestSaga(request, [, successCreator, failureCreator]) {
  return function* requestSaga(requestAction) {
    let result;

    try {
      result = yield call(request, requestAction.payload, requestAction.options);
    } catch (e) {
      yield put(failureCreator(e, { requestAction }));
    }

    const { normalizedResources, ...restResult } = result;

    yield put(addResources(result.normalizedResources));

    yield put(successCreator({ ...restResult }, { requestAction }));
  };
}

import { createStore, compose } from 'redux';
import rootReducer from './reducers';

export default function storeCreator() {
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const enhancers = [];

  return createStore(rootReducer, {}, composeEnhancers(...enhancers));
}

import React from 'react';
import { hot } from 'react-hot-loader';
import 'reset-css';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import createStore from './store/createStore';
import Test from './Test';

const store = createStore();

const App = () => (
  <Provider store={store}>
    <Router>
      <div>
hello world
        <Test />
      </div>
    </Router>
  </Provider>
);

export default hot(module)(App);

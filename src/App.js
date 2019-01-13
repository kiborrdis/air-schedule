import React from 'react';
import { hot } from 'react-hot-loader';
import 'reset-css';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import createStore from './store/createStore';
import RootLayout from './components/RootLayout';
import RootRoutes from './routes';
import './App.css';

const store = createStore();

const App = () => (
  <div className="bp3-dark">
    <Provider store={store}>
      <Router>
        <RootLayout>
          <RootRoutes />
        </RootLayout>
      </Router>
    </Provider>
  </div>
);

export default hot(module)(App);

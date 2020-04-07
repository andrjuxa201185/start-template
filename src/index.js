import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {ConnectedRouter} from 'connected-react-router';
import {sagaMiddleware} from './store/configure/rootMiddleware';
import {globals} from './store/globals';
import configureStore from './store/configure/configureStore';
import Router from './navigation/Router';
import rootSaga from './store/configure/rootSaga';

import history from './store/history';
import './assets/styles/style.scss';
import App from './App.js';

globals.history = history;
globals.store = configureStore();

sagaMiddleware.run(rootSaga);

ReactDOM.render(
  <Provider store={globals.store} >
    <ConnectedRouter history={history}>
      <App>
        <Router />
      </App>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
);


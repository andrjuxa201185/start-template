import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {ConnectedRouter} from 'connected-react-router';
import {sagaMiddleware} from './store/configure/rootMiddleware';
import {globals} from './store/globals';
import configureStore from './store/configure/configureStore';
import Router from './navigation/Router';
import rootSaga from './store/configure/rootSaga';
import {createBrowserHistory} from 'history';
import './assets/styles/style.scss';
import {Alert} from './components/common';

const history = createBrowserHistory();
globals.history = history;
globals.store = configureStore();

sagaMiddleware.run(rootSaga);

ReactDOM.render(
  <Provider store={globals.store} >
    <ConnectedRouter history={history}>
      <>
        <Router />
        <Alert/>
      </>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
);


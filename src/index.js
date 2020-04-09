import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import './assets/styles/style.scss';
import {Alert} from './components/common';
import {ConnectedRouter} from 'connected-react-router';
import {globals} from './store/globals';
import Router from './navigation/Router';
import {store} from './store/configure/configureStore';

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={globals.history}>
      <>
        <Router/>
        <Alert/>
      </>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
);


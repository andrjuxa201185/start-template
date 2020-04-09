import {createStore, compose} from 'redux';
import {globals} from '../globals';
import rootSaga from '../configure/rootSaga';
import {rootReducer} from '../configure/rootReducer';
import {applyMiddleware} from 'redux';
import createSagaMiddleware from 'redux-saga';
import {routerMiddleware} from 'connected-react-router';
import {createBrowserHistory} from 'history';

const history = createBrowserHistory();
globals.history = history;

const sagaMiddleware = createSagaMiddleware();

// eslint-disable-next-line
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
  rootReducer(globals.history),
  composeEnhancers(applyMiddleware(
    routerMiddleware(globals.history),
    sagaMiddleware,
  )),
);

globals.store = store;

sagaMiddleware.run(rootSaga);

import {createStore, compose} from 'redux';
import {globals} from '../globals';
import {combineReducers} from 'redux';
import {connectRouter} from 'connected-react-router';
import auth from '../auth/authReducer';
import alert from '../alert/alertReducer';
import userProfile from '../userProfile/userProfileReducer';
import rootSaga from '../configure/rootSaga';
import {applyMiddleware} from 'redux';
import createSagaMiddleware from 'redux-saga';
import {routerMiddleware} from 'connected-react-router';
import {createBrowserHistory} from 'history';

const history = createBrowserHistory();
globals.history = history;

export const sagaMiddleware = createSagaMiddleware();

const rootReducers = history => combineReducers({
  router: connectRouter(history),
  auth,
  alert,
  userProfile,
});

// eslint-disable-next-line
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
  rootReducers(globals.history),
  composeEnhancers(applyMiddleware(
    routerMiddleware(globals.history),
    sagaMiddleware,
  )),
);

globals.store = store;

sagaMiddleware.run(rootSaga);

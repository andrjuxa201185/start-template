import {applyMiddleware} from 'redux';
import createSagaMiddleware from 'redux-saga';
import {routerMiddleware} from 'connected-react-router';
import {globals} from '../globals';

export const sagaMiddleware = createSagaMiddleware();

export default applyMiddleware(
  routerMiddleware(globals.history),
  sagaMiddleware,
);


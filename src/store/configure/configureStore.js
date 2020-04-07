import {createStore, compose} from 'redux';
import {globals} from '../globals';
import createRootReducer from './rootReducer';
import rootMiddleware from './rootMiddleware';

// eslint-disable-next-line
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const configureStore = () => {
  globals.store = createStore(
    createRootReducer(globals.history),
    composeEnhancers(rootMiddleware),
  );

  return globals.store;
};

export default configureStore;

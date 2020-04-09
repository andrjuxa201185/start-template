import {createStore, compose} from 'redux';
import {globals} from '../globals';
import rootMiddleware from './rootMiddleware';
import {combineReducers} from 'redux';
import {connectRouter} from 'connected-react-router';

import auth from '../auth/authReducer';
import alert from '../alert/alertReducer';
import userProfile from '../userProfile/userProfileReducer';

const rootReducers = history => combineReducers({
  router: connectRouter(history),
  auth,
  alert,
  userProfile,
});

// eslint-disable-next-line
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const configureStore = () => {
  globals.store = createStore(
    rootReducers(globals.history),
    composeEnhancers(rootMiddleware),
  );

  return globals.store;
};

export default configureStore;

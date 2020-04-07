import {combineReducers} from 'redux';
import {connectRouter} from 'connected-react-router';

import auth from '../auth/authReducer';
import alert from '../alert/alertReducer';
import userProfile from '../userProfile/userProfileReducer';

export default history => combineReducers({
  router: connectRouter(history),
  auth,
  alert,
  userProfile,
});

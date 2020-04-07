import {call, put, take} from 'redux-saga/effects';
import {actionTypes} from './authActions';
import * as actions from './authActions';
import {showAlert} from '../alert/alertActions';
import Auth from '../../service/auth';
import Api from "../../service/api";
import {globals} from "../globals";

const {
  LOGIN,
  LOGOUT,
} = actionTypes;

/***************************** Sagas ************************************/

function* login() {
  while (true) {
    const {data} = yield take(LOGIN.REQUEST);
    try {
      const response = yield call(Api.post, 'auth/login', data);
      if (response.status === 200) {
        yield put(actions.login.success());
      }
    } catch (e) {
      yield put(showAlert({
        title: 'Error',
        msg: 'Member name or password is wrong',
      }));
      yield put(actions.login.failure(e));
    }
  }
}

function* logout() {
  while (true) {
    yield take(LOGOUT);
    const token = Auth.getTokenFromLocalStorage();
    localStorage.removeItem('token');
    try {
      if (token?.access_token) {
        yield call(Api.post, 'auth/logout', {api_token: token.access_token});
        globals.history.push('/auth/login');
      }
    } catch (e) {
      console.log(e);
      globals.history.push('/auth/login');
    }
  }
}

export default [
  logout,
  login,
];

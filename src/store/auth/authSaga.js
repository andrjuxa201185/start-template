import {call, put, take} from 'redux-saga/effects';
import {actionTypes} from './authActions';
import * as actions from './authActions';
import {getUserProfile} from '../userProfile/userProfileActions';
import {
  DASHBOARD,
  INVITE_CHECK_MAIL,
} from '../../navigation/routes';
import {showAlert} from '../alert/alertActions';
import Auth from '../../service/auth';
import Api from "../../service/api";
import {globals} from "../globals";
import {clearTributePage} from "../tributePage/tributePageActions";

const {
  LOGIN,
  FORCE_LOGIN,
  LOGIN_GOOGLE,
  LOGIN_FACEBOOK,
  FORGOT_PASSWORD,
  REGISTRATION,
  LOGOUT,
  VERIFICATION,
  CHANGE_PASSWORD,
} = actionTypes;

/***************************** Sagas ************************************/

function* login() {
  while (true) {
    const {data} = yield take(LOGIN.REQUEST);
    try {
      const response = yield call(Api.post, 'auth/login', data);
      if (response.status === 200) {
        if (response.data.data.user_email_verification_is_required) {
          if (response.data.data.user_email_was_verified) {
            if (data.redirectUrl) {
              globals.history.push(data.redirectUrl);
            }
            yield put(actions.login.success(response.data.data.user_data.user_token_data));
            localStorage.setItem('token', JSON.stringify(response.data.data.user_data.user_token_data));
            yield put(getUserProfile.request());
          } else {
            yield call(Api.post, 'auth/email/verification/token/resend', {email: data.email});
            globals.history.push(INVITE_CHECK_MAIL);
            yield put(showAlert({
              title: 'Email not verified',
              msg: 'Check your mail, Please!',
            }));
            yield put(actions.login.failure());
          }
        } else {
          if (data.redirectUrl) {
            globals.history.push(data.redirectUrl);
          }
          yield put(actions.login.success(response.data.data.user_data.user_token_data));
          localStorage.setItem('token', JSON.stringify(response.data.data.user_data.user_token_data));
          yield put(getUserProfile.request());
        }
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

function* forceLoginSaga() {
  while (true) {
    const {data: {token, type}} = yield take(FORCE_LOGIN.REQUEST);
    try {
      const tokenObj = {
        access_token: token,
        access_token_type: type,
      };
      localStorage.removeItem('token');
      yield put(actions.forceLogin.success(tokenObj));
      window.localStorage.setItem('token', JSON.stringify(tokenObj));
      yield put(getUserProfile.request());
      globals.history.push(DASHBOARD);
    } catch (e) {
      yield put(showAlert({
        title: 'Error',
        msg: 'Error force login',
      }));
      yield put(actions.forceLogin.failure(e));
    }
  }
}

function* loginGoogle() {
  while (true) {
    const {data: {token, redirectUrl}} = yield take(LOGIN_GOOGLE.REQUEST);
    const request = {token};
    try {
      const response = yield call(Api.post, 'auth/login/google', request);
      if (response.status === 200) {
        if (redirectUrl) {
          globals.history.push(redirectUrl);
        }
        yield put(actions.loginGoogle.success(response.data.data.user_data.user_token_data));
        localStorage.setItem('token', JSON.stringify(response.data.data.user_data.user_token_data));
        yield put(getUserProfile.request());
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

function* loginFacebook() {
  while (true) {
    const {data: {token, redirectUrl}} = yield take(LOGIN_FACEBOOK.REQUEST);
    const request = {token};
    try {
      const response = yield call(Api.post, 'auth/login/facebook', request);
      if (response.status === 200) {
        if (redirectUrl) {
          globals.history.push(redirectUrl);
        }
        yield put(actions.loginGoogle.success(response.data.data.user_data.user_token_data));
        localStorage.setItem('token', JSON.stringify(response.data.data.user_data.user_token_data));
        yield put(getUserProfile.request());
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
    yield put(clearTributePage());
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

function* registrationSaga() {
  while (true) {
    const {data: {firstName, lastName, email, password, redirectUrl, captchaToken}} = yield take(REGISTRATION.REQUEST);
    const requestData = {
      first_name: firstName,
      last_name: lastName,
      email,
      password,
      recaptcha_token: captchaToken,
    };
    if (redirectUrl) requestData.next_uri = redirectUrl;
    try {
      const response = yield call(Api.post, 'auth/register', requestData);
      if (response.status === 200) {
        globals.history.push(INVITE_CHECK_MAIL);
        yield put(actions.registration.success());
      }
    } catch (e) {
      const response = e.return || e;
      if (response.status === 422) {
        yield put(showAlert({title: 'Error', msg: response.data.message}));
      }
      yield put(actions.registration.failure(e));
    }
  }
}

function* verificationSaga() {
  while (true) {
    const {data: {token, redirectUrl}} = yield take(VERIFICATION);
    let route = '';
    if (redirectUrl) {
      route = `?redirect_url=${redirectUrl}`;
    }
    try {
      const response = yield call(Api.post, 'auth/email/verify', {token});
      if (response.status === 200) {
        globals.history.push('/auth/login' + route);
        yield put(showAlert({
          title: 'Success',
          msg: 'Email was verified. Login, please',
        }));
      }
    } catch (e) {
      globals.history.push('/auth/registration' + route);
      yield put(showAlert({title: 'Error', msg: 'Error verification'}));
    }
  }
}

function* forgotPasswordSaga() {
  while (true) {
    const {data, onSuccess} = yield take(FORGOT_PASSWORD.REQUEST);
    try {
      const response = yield call(Api.post, 'auth/password/reset', data);
      if (response.status === 200) {
        yield put(actions.forgotPassword.success());
      } else {
        yield put(actions.forgotPassword.failure());
        yield put(showAlert({title: 'Error', msg: 'Invalid Email'}));
      }
    } catch (e) {
      yield put(actions.forgotPassword.failure());
      const response = e.response || e;
      yield put(showAlert({title: 'Error', msg: response.data.message}));
    } finally {
      onSuccess && onSuccess();
    }
  }
}

function* changePasswordSaga() {
  while (true) {
    const {data, onSuccess} = yield take(CHANGE_PASSWORD.REQUEST);
    try {
      const response = yield call(Api.post, 'auth/password/set', data);
      if (response.status === 200) {
        yield put(actions.forgotPassword.success());
      }
    } catch (e) {
      const resp = e.response && e.response.data && Object.values(e.response.data.errors)[0];
      yield put(actions.changePassword.failure(e));
      yield put(showAlert({title: 'Error!', msg: resp}));
    } finally {
      onSuccess && onSuccess();
    }
  }
}

export default [
  logout,
  login,
  forceLoginSaga,
  loginGoogle,
  loginFacebook,
  forgotPasswordSaga,
  changePasswordSaga,
  registrationSaga,
  verificationSaga,
];

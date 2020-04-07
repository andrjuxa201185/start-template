import {call, put, take} from 'redux-saga/effects';
import {actionTypes} from './contactsActions';
import * as actions from './contactsActions';
import Api from "../../service/api";
import {showAlert} from "../alert/alertActions";
import {YAHOO_REDIRECT_URI} from "../../service/apiConstants";

const {
  GET_USER_CONTACTS,
  GET_USER_EMAIL_CONTACTS,
  GET_SOCIAL_CONTACTS,
} = actionTypes;

/***************************** Sagas ************************************/

function* getSocialContactsSaga() {
  while (true) {
    const {data} = yield take(GET_SOCIAL_CONTACTS.REQUEST);
    try {
      const {socialName} = data;
      let response;
      switch (socialName) {
        case 'google':
          response = yield call(Api.get, `contacts/emails/google`, {google_token: data.token});
          break;
        case 'microsoft':
          response = yield call(Api.get, `contacts/emails/microsoft`, {microsoft_token: data.token});
          break;
        case 'yahoo':
          response = yield call(Api.get, `contacts/emails/yahoo`, {
            yahoo_code: data.code,
            yahoo_redirect_uri: YAHOO_REDIRECT_URI,
          });
          break;
      }
      if (response.status === 200) {
        const {data} = response.data;
        yield put(actions.getSocialContacts.success(data[`${socialName}_email_contact_list`]));
      }
    } catch (e) {
      yield put(actions.getSocialContacts.failure());
      yield put(showAlert({
        title: 'Error Get Social contacts',
        msg: 'errors',
      }));
    }
  }
}

function* getUserContactsSaga() {
  while (true) {
    yield take(GET_USER_CONTACTS.REQUEST);
    try {
      const response = yield call(Api.get, `auth/user/contacts`);
      if (response.status === 200) {
        const {data} = response.data;
        yield put(actions.getUserContacts.success(data.auth_user_contact_list));
      }
    } catch (e) {
      yield put(actions.getUserContacts.failure());
      yield put(showAlert({
        title: 'Error Get User contacts',
        msg: 'errors',
      }));
    }
  }
}

function* getUserEmailContactsSaga() {
  while (true) {
    yield take(GET_USER_EMAIL_CONTACTS.REQUEST);
    try {
      const response = yield call(Api.get, `auth/user/emailContacts`);
      if (response.status === 200) {
        const {data} = response.data;
        yield put(actions.getUserEmailContacts.success(data.auth_user_email_contact_list));
      }
    } catch (e) {
      yield put(actions.getUserEmailContacts.failure());
      yield put(showAlert({
        title: 'Error Get Email contacts',
        msg: 'errors',
      }));
    }
  }
}

export default [
  getUserContactsSaga,
  getSocialContactsSaga,
  getUserEmailContactsSaga,
];

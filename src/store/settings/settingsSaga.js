import {call, put, take} from 'redux-saga/effects';
import {actionTypes} from './settingsActions';
import * as actions from './settingsActions';
import Api from "../../service/api";
import {showAlert} from "../alert/alertActions";
import {REQUEST} from "../../utils/action";

const {
  GET_CONTACT_INFO,
  CHECK_CAPTCHA,
} = actionTypes;

/***************************** Sagas ************************************/

function* getContactsInfoSaga() {
  while (true) {
    yield take(GET_CONTACT_INFO[REQUEST]);
    try {
      const response = yield call(Api.get, `project/settings`);
      if (response.status === 200) {
        yield put(actions.getContactInfo.success(response.data.data.project_settings.data));
      }
    } catch (e) {
      // const response = e.response || e;
      yield put(actions.getContactInfo.failure());
      yield put(showAlert({title: 'Error', msg: 'Error Get Contact Info'}));
    }
  }
}

function* checkCaptchaSaga() {
  while (true) {
    const {data: {token}, onSuccess} = yield take(CHECK_CAPTCHA[REQUEST]);

    try {
      const requestData = {token};
      const response = yield call(Api.testRequest, '/checkCaptcha', 'post', requestData);

      if (response.status === 200) {
        yield put(actions.checkCaptcha.success());
        if (response.data.success) onSuccess();
      }
    } catch (e) {
      console.log(e);
    }
  }
}

export default [
  getContactsInfoSaga,
  checkCaptchaSaga,
];


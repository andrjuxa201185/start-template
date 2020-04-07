import {call, put, take, takeLatest} from 'redux-saga/effects';
import {actionTypes} from './userProfileActions';
import * as actions from './userProfileActions';
import Api from "../../service/api";
import {showAlert} from "../alert/alertActions";
import {REQUEST} from "../../utils/action";

const {
  GET,
  CHANGE_EMAIL,
  CHANGE_PHOTO,
} = actionTypes;

/***************************** Sagas ************************************/

function* getUserProfileSaga() {
  yield takeLatest(GET[REQUEST], function* () {
    try {
      const response = yield call(Api.get, `auth/user`);
      if (response.status === 200) {
        const {data} = response.data;
        yield put(actions.getUserProfile.success(data.user));
      }
    } catch (e) {
      const response = e.response || e;
      yield put(actions.getUserProfile.failure());
      if (response.status !== 401) {
        yield put(showAlert({
          title: 'Error Get User Profile',
          msg: 'errors',
        }));
      }
    }
  });
}

function* changeEmailSaga() {
  while (true) {
    const {data, onSuccess} = yield take(CHANGE_EMAIL.REQUEST);
    try {
      const requestData = {email: data.email};
      const response = yield call(Api.post, 'auth/user/email/set', requestData);
      if (response.status === 200) {
        yield put(actions.changeEmailUI.success({email: data.email}));
        onSuccess?.();
      }
    } catch (e) {
      const response = e.response || e;
      if (response.status === 422) {
        yield put(showAlert({
          title: 'Error Change Email',
          msg: response.data.errors.email[0],
        }));
      } else {
        yield put(showAlert({title: 'Error Change Email', msg: 'errors'}));
      }
      yield put(actions.changeEmailUI.failure());
    }
  }
}

function* changePhotoSaga() {
  while (true) {
    const {data} = yield take(CHANGE_PHOTO.REQUEST);
    try {
      const response = yield call(Api.uploadImage, `auth/user/profile/photo/set`, 'POST', data.avatar);
      if (response.status === 200) {
        yield put(actions.changePhoto.success(response.data.data.auth_user_profile_photo));
        yield put(showAlert({title: 'Success', msg: 'Edit Photo success'}));
      }
    } catch (e) {
      // const response = e.response || e;
      yield put(actions.changePhoto.failure());
      yield put(showAlert({title: 'Error Edit Profile', msg: 'error'}));
    }
  }
}

export default [
  getUserProfileSaga,
  changeEmailSaga,
  changePhotoSaga,
];

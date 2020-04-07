import {call, put, take, takeLatest} from 'redux-saga/effects';
import {actionTypes} from './userProfileActions';
import * as actions from './userProfileActions';
import Api from "../../service/api";
import {showAlert} from "../alert/alertActions";
import {getAllNum} from "../../helpers/common";
import {REQUEST} from "../../utils/action";

const {
  GET,
  CHANGE_PASSWORD,
  CHANGE_EMAIL,
  CHANGE_PHOTO,
  CHANGE_PHONE,
  CHANGE_PROFILE,
  GET_IS_SET_PW,
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

function* getIsSetPasswordSaga() {
  while (true) {
    const {cb} = yield take(GET_IS_SET_PW.REQUEST);
    try {
      const response = yield call(Api.get, `auth/user/password`);
      if (response.status === 200) {
        cb(response.data.data.user_password_is_set);
        yield put(actions.getIsSetPassword.success());
      }
    } catch (e) {
      yield put(actions.getIsSetPassword.failure());
      yield put(showAlert({
        title: 'Error Get Current Password',
        msg: 'errors',
      }));
    }
  }
}

function* changePasswordSaga() {
  while (true) {
    const {data, onSuccess} = yield take(CHANGE_PASSWORD.REQUEST);
    try {
      const requestData = {
        new_password: data.password,
        old_password: data.currentPassword,
      };
      const response = yield call(Api.post, 'auth/user/password/set', requestData);
      if (response.status === 200) {
        yield put(actions.changePasswordUI.success());
        yield put(showAlert({title: 'Success', msg: 'Edit password success'}));
      }
    } catch (e) {
      const response = e.response || e;
      if (response.status === 422) {
        yield put(actions.changePasswordUI.failure());
        yield put(showAlert({
          title: 'Error Change Password',
          msg: response.data.errors.old_password || response.data.errors.password[0],
        }));
      } else {
        yield put(showAlert({title: 'Error Change Password', msg: 'errors'}));
      }
      yield put(actions.changePasswordUI.failure());
    } finally {
      onSuccess?.();
    }
  }
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

function* changePhoneSaga() {
  while (true) {
    const {data: {phone}} = yield take(CHANGE_PHONE.REQUEST);
    const requestData = {
      phone: getAllNum(phone),
    };
    try {
      const response = yield call(Api.post, `auth/user/profile/phone/set`, requestData);
      if (response.status === 200) {
        yield put(actions.changePhone.success(response.data.data.auth_user_profile_phone));
        yield put(showAlert({title: 'Success', msg: 'Edit Phone success'}));
      }
    } catch (e) {
      // const response = e.response || e;
      yield put(actions.changePhone.failure());
      yield put(showAlert({title: 'Error Edit Phone', msg: 'error'}));
    }
  }
}

function* changeProfileSaga() {
  while (true) {
    const {data: {firstName, lastName}} = yield take(CHANGE_PROFILE.REQUEST);
    const requestData = {
      first_name: firstName,
      last_name: lastName,
    };
    try {
      const response = yield call(Api.post, `auth/user/profile/fullname/set`, requestData);
      if (response.status === 200) {
        yield put(actions.changeProfile.success(response.data.data.auth_user_profile_fullname));
        yield put(showAlert({title: 'Success', msg: 'Edit Profile Success'}));
      }
    } catch (e) {
      // const response = e.response || e;
      yield put(actions.changeProfile.failure());
      yield put(showAlert({title: 'Error Edit Phone', msg: 'error'}));
    }
  }
}

export default [
  getIsSetPasswordSaga,
  getUserProfileSaga,
  changePasswordSaga,
  changeEmailSaga,
  changePhotoSaga,
  changeProfileSaga,
  changePhoneSaga,
];

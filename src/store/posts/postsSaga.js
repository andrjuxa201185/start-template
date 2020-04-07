import {call, put, take, takeEvery} from 'redux-saga/effects';
import {actionTypes} from './postsActions';
import * as actions from './postsActions';
import Api from "../../service/api";
import Auth from '../../service/auth';
import {showAlert} from "../alert/alertActions";
import {REQUEST} from "../../utils/action";

const {
  CREATE,
  GET_POSTS,
  EDIT_POST,
  GET_POST,
  SWITCH_VISIBLE,
  DRAG_POST,
} = actionTypes;

/***************************** Sagas ************************************/

function* getPostsSaga() {
  while (true) {
    const {data: {nextPage, count, pageId}, onSuccess} = yield take(GET_POSTS[REQUEST]);
    try {
      const response = yield call(Api.get, nextPage || `tributes/${pageId}/wall/posts`, {per_page: count});
      if (response.status === 200) {
        yield put(actions.getPosts.success({
          response: response.data.data.tribute_wall_posts,
          loadMore: !!nextPage,
        }));
      }
    } catch (e) {
      const response = e.response || e;
      if (response.status === 429) {
        yield put(showAlert({title: 'Error ', msg: response.data.message}));
      } else {
        yield put(showAlert({title: 'Error ', msg: 'Error Get Post'}));
      }
      yield put(actions.getPosts.failure());
    } finally {
      onSuccess && onSuccess();
    }
  }
}

function* getPostSaga() {
  while (true) {
    const {data} = yield take(GET_POST[REQUEST]);
    try {
      const response = yield call(Api.get, `tributes/wall/posts/${data.postId}`);
      if (response.status === 200) {
        yield put(actions.getPost.success(response.data.data.tribute_wall_post));
      }
    } catch (e) {
      // const response = e.response || e;
      yield put(actions.createPost.failure());
      yield put(showAlert({title: 'Error Get Post', msg: 'Error'}));
    }
  }
}

function* createPostSaga() {
  while (true) {
    const {data, onSuccess} = yield take(CREATE[REQUEST]);
    try {
      const token = Auth.getTokenFromLocalStorage();
      let response;
      let route = 'text';
      const requestData = {};
      const formData = new FormData();

      if (data.videoURL) {
        route = 'video';
        requestData.video_link = data.videoURL;
      }
      if (data.photo) {
        route = 'photo';
        formData.append('photo_file', data.photo, data.photo.name);
        formData.append('message', data.message);
      }
      if (data.background) {
        route = 'guestbook';
        requestData.guestbook_id = data.backgroundId;
      }
      if (data.candleURL) {
        route = 'candle';
        requestData.candle_id = data.candleId;
      }

      if (!token) {
        requestData.guest_user_first_name = data.firstName;
        requestData.guest_user_last_name = data.lastName;
        requestData.guest_user_email = data.email;
        requestData.guest_user_phone = data.phone;
        if (data.photo) {
          formData.append('guest_user_first_name', data.firstName);
          formData.append('guest_user_last_name', data.lastName);
          formData.append('guest_user_email', data.email);
          formData.append('guest_user_phone', data.phone);
        }
      }

      requestData.message = data.message;

      if (data.photo) {
        response = yield call(Api.post, `tributes/${data.tributeId}/wall/posts/${route}`, formData, {'Content-Type': 'multipart/form-data'});
      } else {
        response = yield call(Api.post, `tributes/${data.tributeId}/wall/posts/${route}`, requestData);
      }

      if (response.status === 200) {
        yield put(actions.createPost.success(response.data.data.tribute_wall_post));
      }
    } catch (e) {
      // const response = e.response || e;
      yield put(actions.createPost.failure());
      yield put(showAlert({title: 'Error Create Post', msg: 'Error'}));
    } finally {
      onSuccess && onSuccess();
    }
  }
}

function* switchVisibleSaga() {
  yield takeEvery(SWITCH_VISIBLE[REQUEST], function* (action) {
    const {data, onSuccess} = action;
    try {
      const response = yield call(Api.post, `tributes/wall/posts/${data.postId}/${data.status}`);
      if (response.status === 200) {
        onSuccess && onSuccess();
        yield put(actions.switchVisible.success(response.data.data.tribute_wall_post));
      }
    } catch (e) {
      onSuccess && onSuccess();
      // const response = e.response || e;
      yield put(actions.switchVisible.failure());
      yield put(showAlert({title: 'Error Switch Status RSVP', msg: 'errors'}));
    }
  });
}

function* editPostSaga() {
  while (true) {
    const {data, onSuccess} = yield take(EDIT_POST[REQUEST]);
    try {
      let response;
      const requestData = {};
      const formData = new FormData();
      if (data.videoURL) {
        requestData.video_link = data.videoURL;
      }
      if (data.photo) {
        formData.append('photo_file', data.photo, data.photo.name);
        formData.append('message', data.message);
      }
      if (data.background) {
        requestData.guestbook_id = data.backgroundId;
      }
      if (data.candleURL) {
        requestData.candle_id = data.candleId;
      }
      requestData.message = data.message;
      if (data.photo) {
        response = yield call(Api.post, `tributes/wall/posts/${data.postId}/update`, formData, {'Content-Type': 'multipart/form-data'});
      } else {
        response = yield call(Api.post, `tributes/wall/posts/${data.postId}/update`, requestData);
      }
      if (response.status === 200) {
        yield put(actions.editPost.success(response.data.data.tribute_wall_post));
      }
    } catch (e) {
      // const response = e.response || e;
      yield put(actions.editPost.failure());
      yield put(showAlert({title: 'Error Edit Post', msg: 'Error'}));
    } finally {
      onSuccess && onSuccess();
    }
  }
}

function* dragPostSaga() {
  while (true) {
    const {data, onSuccess} = yield take(DRAG_POST[REQUEST]);
    yield put(actions.dragPost.success(data.newPosts));

    const requestData = {
      post_id_on_old_position: data.postId,
      post_id_on_new_position: data.newPosition,
    };
    try {
      yield call(Api.post, `tributes/wall/posts/positions/change`, requestData);
    } catch (e) {
      // const response = e.response || e;
      yield put(actions.editPost.failure(data.posts));
      yield put(showAlert({title: 'Error Drag Post', msg: 'Error'}));
    } finally {
      onSuccess?.();
    }
  }
}

export default [
  createPostSaga,
  getPostsSaga,
  editPostSaga,
  getPostSaga,
  switchVisibleSaga,
  dragPostSaga,
];


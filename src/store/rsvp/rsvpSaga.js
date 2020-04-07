import {call, put, take, takeEvery} from 'redux-saga/effects';
import {actionTypes} from './rsvpActions';
import * as actions from './rsvpActions';
import Api from "../../service/api";
import {showAlert} from "../alert/alertActions";
import {REQUEST} from "../../utils/action";
import {getAllNum} from "../../helpers/common";
import fileDownload from 'js-file-download';

const {
  CREATE_RSVP,
  CREATE_REVIEW,
  UPDATE_RSVP,
  GET_RSVPS,
  GET_RSVP,
  DOWNLOAD_RSVP_LIST,
  SWITCH_STATUS,
} = actionTypes;

/***************************** Sagas ************************************/

function* createReviewSaga() {
  while (true) {
    const {data, onSuccess} = yield take(CREATE_REVIEW[REQUEST]);
    const requestData = {
      first_name: data.firstName,
      last_name: data.lastName,
      email: data.email,
      phone: getAllNum(data.phone),
      role: data.role && String(data.role).toLowerCase(),
      rating: '*'.repeat(data.rating),
      review: data.description,
      share_review_with_vendor: data.isVendor ? '1' : '0',
      total_number_of_people: data.numberPeople,
    };
    try {
      const response = yield call(Api.post, `tributes/events/${data.eventId}/reviews`, requestData);
      if (response.status === 200) {
        yield put(actions.createReview.success());
        yield put(showAlert({title: 'Success', msg: 'Your Review Was Added'}));
      }
    } catch (e) {
      // const response = e.response || e;
      yield put(actions.createReview.failure());
      yield put(showAlert({title: 'Error Create RSVP', msg: 'errors'}));
    } finally {
      onSuccess && onSuccess();
    }
  }
}

function* createRsvpSaga() {
  while (true) {
    const {data, onSuccess} = yield take(CREATE_RSVP[REQUEST]);
    const requestData = {
      first_name: data.firstName,
      last_name: data.lastName,
      email: data.email,
      phone: getAllNum(data.phone),
      total_number_of_people: data.numberPeople || 0,
    };

    if (data.status) {
      requestData.status = data.status.toLowerCase();
    }

    try {
      const response = yield call(Api.post, `tributes/events/${data.eventId}/${data.status ? 'rsvp-tracker/' : ''}rsvps`, requestData);
      if (response.status === 200) {
        yield put(actions.createRsvp.success(response.data.data.tributeEventRsvp));
        yield put(showAlert({title: 'Success', msg: 'Your RSVP Was Added'}));
      }
    } catch (e) {
      // const response = e.response || e;
      yield put(actions.createRsvp.failure());
      yield put(showAlert({title: 'Error Create RSVP', msg: 'errors'}));
    } finally {
      onSuccess?.();
    }
  }
}

function* updateRsvpSaga() {
  while (true) {
    const {data, onSuccess} = yield take(UPDATE_RSVP[REQUEST]);
    const requestData = {
      first_name: data.firstName,
      last_name: data.lastName,
      email: data.email,
      phone: getAllNum(data.phone),
      total_number_of_people: data.numberPeople || 0,
      status: String(data.status).toLowerCase(),
    };
    try {
      const response = yield call(Api.post, `tributes/events/rsvp-tracker/rsvps/${data.rsvpId}/set`, requestData);
      if (response.status === 200) {
        yield put(actions.updateRsvp.success(response.data.data.tributeEventRsvp));
        yield put(showAlert({title: 'Success', msg: 'Your RSVP Was Update'}));
      }
    } catch (e) {
      // const response = e.response || e;
      yield put(actions.updateRsvp.failure());
      yield put(showAlert({title: 'Error Update RSVP', msg: 'errors'}));
    } finally {
      onSuccess?.();
    }
  }
}

function* getRsvpsSaga() {
  while (true) {
    const {data: {nextPage, count, eventId, sortBy, filterBy, search}, onSuccess} = yield take(GET_RSVPS[REQUEST]);
    const translator = {
      ['Most Recent']: 'most_recent',
      ['Least Recent']: 'least_recent',
      ['First Name(A-Z)']: 'first_name_az',
      ['First Name(Z-A)']: 'first_name_za',
      ['Last Name(A-Z)']: 'last_name_az',
      ['Last Name(Z-A)']: 'last_name_za',
      ['All RSVPs']: 'both',
      ['Accepting']: 'only_attending',
      ['Declining']: 'only_declining',
    };

    const requestData = {
      show: translator[filterBy] || 'both',
      per_page: count,
      sort_by: translator[sortBy] || 'most_recent',
    };
    if (search) {
      requestData.search = search;
    }
    try {
      const response = yield call(Api.get, nextPage || `tributes/events/${eventId}/rsvp-tracker/rsvps`, requestData);
      if (response.status === 200) {
        yield put(actions.getRsvps.success({
          response: response.data.data.tribute_event_rsvps.filtered_entities,
          loadMore: !!nextPage,
          count: response.data.data.tribute_event_rsvps.general_counts.responses,
          people: response.data.data.tribute_event_rsvps.general_counts.people.attending,
          sortBy: requestData.sort_by,
        }));
      }
    } catch (e) {
      // const response = e.response || e;
      yield put(actions.getRsvps.failure());
      yield put(showAlert({title: 'Error Get RSVP', msg: 'errors'}));
    } finally {
      onSuccess?.();
    }
  }
}

function* getRsvpSaga() {
  while (true) {
    const {data} = yield take(GET_RSVP[REQUEST]);
    try {
      const response = yield call(Api.get, `tributes/events/rsvp-tracker/rsvps/${data.rsvpId}`);
      if (response.status === 200) {
        yield put(actions.getRsvp.success(response.data.data.tribute_event_rsvp));
      }
    } catch (e) {
      // const response = e.response || e;
      yield put(actions.getRsvp.failure());
      yield put(showAlert({title: 'Error Get RSVP', msg: 'errors'}));
    }
  }
}

function* switchStatusRsvp() {
  yield takeEvery(SWITCH_STATUS[REQUEST], function* (action) {
    const {data, onSuccess} = action;
    const status = String(data.status).toLowerCase() === 'attending' ? 'declining' : 'attending';
    try {
      const response = yield call(Api.post, `tributes/events/rsvp-tracker/rsvps/${data.rsvpId}/set-${status}`);
      if (response.status === 200) {
        yield put(actions.switchStatus.success(response.data.data.tributeEventRsvp));
      }
    } catch (e) {
      // const response = e.response || e;
      yield put(actions.switchStatus.failure());
      yield put(showAlert({
        title: 'Error Switch Status RSVP',
        msg: 'errors',
      }));
    } finally {
      onSuccess?.();
    }
  });
}

function* downloadRsvpListSaga() {
  while (true) {
    const {data} = yield take(DOWNLOAD_RSVP_LIST[REQUEST]);
    try {
      const response = yield call(Api.fileDownload, `tributes/events/${data.eventId}/rsvp-tracker/rsvps/pdf/landscape`, 'GET');
      if (response.status === 200) {
        fileDownload(response.data, 'RSVP_list.pdf');
        yield put(actions.downloadRsvpList.success());
      }
    } catch (e) {
      // const response = e.response || e;
      yield put(actions.downloadRsvpList.failure());
      yield put(showAlert({
        title: 'Error Download RSVP list',
        msg: 'errors',
      }));
    }
  }
}

export default [
  getRsvpsSaga,
  createRsvpSaga,
  updateRsvpSaga,
  createReviewSaga,
  getRsvpSaga,
  switchStatusRsvp,
  downloadRsvpListSaga,
];


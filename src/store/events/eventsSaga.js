import {call, put, take, takeEvery} from 'redux-saga/effects';
import {actionTypes} from './eventsActions';
import * as actions from './eventsActions';
import Api from "../../service/api";
import {showAlert} from "../alert/alertActions";
import {REQUEST} from "../../utils/action";

const {
  CREATE,
  UPDATE,
  DELETE,
  GET_ONE,
  GET_WITH_LOCATION,
  GET,
} = actionTypes;

/***************************** Sagas ************************************/

function* getEventsSaga() {
  yield takeEvery(GET[REQUEST], function* (action) {
    const {data: {nextPage, count, pageId, type}} = action;
    try {
      const response = yield call(Api.get, nextPage || `tributes/${pageId}/events`, {
        per_page: count,
        type,
      });
      if (response.status === 200) {
        yield put(actions.getEvents.success({
          response: response.data.data.tribute_events,
          loadMore: !!nextPage,
          type: type ? type : 'none',
        }));
      }
    } catch (e) {
      const response = e.response || e;
      if (response.status === 429) {
        yield put(showAlert({title: 'Error ', msg: response.data.message}));
      } else {
        yield put(showAlert({title: 'Error getEvents', msg: 'Error'}));
      }
      yield put(actions.getEvents.failure());
    }
  });
}

function* getEventSaga() {
  while (true) {
    const {data: {eventId}} = yield take(GET_ONE[REQUEST]);
    try {
      const response = yield call(Api.get, `tributes/events/${eventId}`);
      if (response.status === 200) {
        yield put(actions.getEvent.success(response.data.data.tribute_event));
      }
    } catch (e) {
      // const response = e.response || e;
      yield put(actions.getEvent.failure());
      yield showAlert({title: 'Error', msg: 'Error get event'});
    }
  }
}

function* createEventSaga() {
  while (true) {
    const {data, onSuccess} = yield take(CREATE[REQUEST]);
    try {
      let response;
      if (data.photo) {
        let form = new FormData();
        form.append('photo', data.photo, 'avatar.jpg');
        form.append('title', data.title);
        form.append('location', data.location);
        form.append('description', data.description);
        form.append('add_to_calendar', data.addToCalendar ? 1 : 0);
        form.append('allow_guest_to_rsvp', data.allowToRSVP ? 1 : 0);
        form.append('include_map_of_location', data.includeMap ? 1 : 0);
        form.append('display_on_homepage', data.displayOnHomepage ? 1 : 0);
        if (!data.dateDeterm) {
          form.append('starts_at', data.starts_at);
          form.append('finishes_at', data.finishes_at);
        }
        response = yield call(Api.post, `tributes/${data.pageId}/events`, form, {'Content-Type': 'multipart/form-data'});
      } else {
        const requestData = {
          title: data.title,
          location: data.location,
          description: data.description,
          add_to_calendar: data.addToCalendar ? 1 : 0,
          allow_guest_to_rsvp: data.allowToRSVP ? 1 : 0,
          include_map_of_location: data.includeMap ? 1 : 0,
          display_on_homepage: data.displayOnHomepage ? 1 : 0,
        };
        if (!data.dateDeterm) {
          requestData.starts_at = data.starts_at;
          requestData.finishes_at = data.finishes_at;
        }
        response = yield call(Api.post, `tributes/${data.pageId}/events`, requestData);
      }
      if (response.status === 200) {
        yield put(actions.createEvent.success(response.data.data.tributeEvent));
      }
    } catch (e) {
      const response = e.response || e;
      yield put(actions.createEvent.failure());
      if (response.status === 422) {
        if (response.data.errors.photo) {
          yield put(showAlert({
            title: 'Error Create Event',
            msg: response.data.errors.photo[0],
          }));
        }
      } else {
        yield put(showAlert({title: 'Error Create Event', msg: 'Error'}));
      }
    } finally {
      onSuccess && onSuccess();
    }
  }
}

function* updateEventSaga() {
  while (true) {
    const {data, onSuccess} = yield take(UPDATE[REQUEST]);
    try {
      let response;
      if (data.photo) {
        let form = new FormData();
        form.append('photo', data.photo, 'avatar.jpg');
        form.append('title', data.title);
        form.append('description', data.description);
        form.append('add_to_calendar', data.addToCalendar ? 1 : 0);
        form.append('allow_guest_to_rsvp', data.allowToRSVP ? 1 : 0);
        form.append('include_map_of_location', data.includeMap ? 1 : 0);
        form.append('display_on_homepage', data.displayOnHomepage ? 1 : 0);
        if (!data.dateDeterm) {
          form.append('starts_at', data.starts_at);
          form.append('finishes_at', data.finishes_at);
        }
        response = yield call(Api.post, `tributes/events/${data.eventId}/set`, form, {'Content-Type': 'multipart/form-data'});
      } else {
        const requestData = {
          title: data.title,
          location: data.location,
          description: data.description,
          add_to_calendar: data.addToCalendar ? 1 : 0,
          allow_guest_to_rsvp: data.allowToRSVP ? 1 : 0,
          include_map_of_location: data.includeMap ? 1 : 0,
          display_on_homepage: data.displayOnHomepage ? 1 : 0,
        };
        if (!data.dateDeterm) {
          requestData.starts_at = data.starts_at;
          requestData.finishes_at = data.finishes_at;
        }
        response = yield call(Api.post, `tributes/events/${data.eventId}/set`, requestData);
      }
      if (response.status === 200) {
        yield put(actions.updateEvent.success(response.data.data.tributeEvent));
      }
    } catch (e) {
      // const response = e.response || e;
      yield put(actions.updateEvent.failure());
      yield put(showAlert({title: 'Error Update Event', msg: 'errors'}));
    } finally {
      onSuccess && onSuccess();
    }
  }
}

function* deleteEventSaga() {
  while (true) {
    const {data} = yield take(DELETE[REQUEST]);
    try {
      const response = yield call(Api.delete, `tributes/events/${data}`);
      if (response.status === 200) {
        yield put(actions.deleteEvent.success(data));
      }
    } catch (e) {
      // const response = e.response || e;
      yield put(actions.deleteEvent.failure());
      yield put(showAlert({title: 'Error Delete Event', msg: 'errors'}));
    }
  }
}

function* getEventsWithLocationSaga() {
  while (true) {
    const {data: {pageId}} = yield take(GET_WITH_LOCATION[REQUEST]);
    try {
      const response = yield call(Api.get, `tributes/${pageId}/events/filters:upcoming,withLocations,withoutPagination;select:title,starts_at,location;`);
      if (response.status === 200) {
        yield put(actions.getEventsWithLocation.success(response.data.data.tribute_events));
      }
    } catch (e) {
      // const response = e.response || e;
      yield put(actions.getEvents.failure());
      yield put(showAlert({title: 'Error Get Event', msg: 'errors'}));
    }
  }
}

export default [
  getEventsWithLocationSaga,
  createEventSaga,
  getEventsSaga,
  updateEventSaga,
  getEventSaga,
  deleteEventSaga,
];


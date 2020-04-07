import {call, put, take} from 'redux-saga/effects';
import {actionTypes} from './designActions';
import * as actions from './designActions';
import Api from "../../service/api";
import {showAlert} from "../alert/alertActions";
import {REQUEST} from "../../utils/action";

const {
  GET_DESIGN,
  GET_ALL_DESIGN,
} = actionTypes;

/***************************** Sagas ************************************/

function* getDesignSaga() {
  while (true) {
    const {data} = yield take(GET_DESIGN[REQUEST]);
    try {
      const response = yield call(Api.get, `dictionaries/tribute-designs/${data.pageId}`);
      if (response.status === 200) {
        const {data} = response.data;
        yield put(actions.getDesign.success(data.tribute_design));
      }
    } catch (e) {
      // const response = e.response || e;
      yield put(actions.getDesign.failure());
      yield put(showAlert({
        title: 'Error get design',
        msg: 'errors',
      }));
    }
  }
}

function* getAllDesignSaga() {
  while (true) {
    const {data: {nextPage, count, newList}} = yield take(GET_ALL_DESIGN[REQUEST]);
    try {
      const response = yield call(Api.get, nextPage || `dictionaries/tribute-designs`, {per_page: count});
      if (response.status === 200) {
        yield put(actions.getAllDesign.success({
          response: response.data.data.tribute_designs,
          loadMore: !!nextPage && !newList,
        }));
      }
    } catch (e) {
      const response = e.response || e;
      yield put(actions.getAllDesign.failure());
      if (response.status === 429) {
        yield put(showAlert({title: 'Error ', msg: response.data.message}));
      } else {
        yield put(showAlert({
          title: 'Error get designs',
          msg: 'errors',
        }));
      }
    }
  }
}

export default [
  getDesignSaga,
  getAllDesignSaga,
];


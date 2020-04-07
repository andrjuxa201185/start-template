import {call, put, take} from 'redux-saga/effects';
import {actionTypes} from './dictionariesActions';
import * as actions from './dictionariesActions';
import Api from "../../service/api";
import {showAlert} from "../alert/alertActions";
import {REQUEST} from "../../utils/action";

const {
  GET_BG_POST,
} = actionTypes;

/***************************** Sagas ************************************/

function* getCandlesSaga() {
  while (true) {
    const {data: {field}} = yield take(GET_BG_POST[REQUEST]);
    try {
      const response = yield call(Api.get, `dictionaries/${field}`);
      if (response.status === 200) {
        yield put(actions.getBg.success({
          data: response.data.data[field],
          field,
        }));
      }
    } catch (e) {
      // const response = e.response || e;
      yield put(actions.getBg.failure());
      yield put(showAlert({title: 'Error Get Candles', msg: 'error'}));

    }
  }
}

export default [
  getCandlesSaga,
];


import {call, put, take} from 'redux-saga/effects';
import {actionTypes} from './myTributePagesActions';
import * as actions from './myTributePagesActions';
import Api from "../../service/api";
import {showAlert} from "../alert/alertActions";
import {REQUEST} from "../../utils/action";

const {GET} = actionTypes;

/***************************** Sagas ************************************/

function* getMyTributePagesSaga() {
  while (true) {
    const {data: {nextPage, count}} = yield take(GET[REQUEST]);
    try {
      const response = yield call(Api.get, nextPage || `auth/user/tributes`, {per_page: count});
      if (response.status === 200) {
        yield put(actions.getMyTributePages.success({
          response: response.data.data.user_tributes,
          loadMore: !!nextPage,
        }));
      } else {
        yield put(actions.getMyTributePages.failure());
      }
    } catch (e) {
      const response = e.response || e;
      yield put(actions.getMyTributePages.failure());
      if (response.status !== 401) {
        yield put(showAlert({title: 'Error ', msg: 'Error'}));
      }
    }
  }
}

export default [
  getMyTributePagesSaga,
];

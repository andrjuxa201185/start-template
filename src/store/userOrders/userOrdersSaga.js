import {call, put, take} from 'redux-saga/effects';
import {actionTypes} from './userOrdersActions';
import * as actions from './userOrdersActions';
import Api from "../../service/api";
import {showAlert} from "../alert/alertActions";
import {REQUEST} from "../../utils/action";

const {
  GET,
} = actionTypes;

/***************************** Sagas ************************************/

function* getUserOrdersSaga() {
  while (true) {
    const {data: {nextPage, count}, onSuccess} = yield take(GET[REQUEST]);
    try {
      const response = yield call(Api.get, nextPage || `auth/user/shop/orders`, {per_page: count});
      if (response.status === 200) {
        yield put(actions.getUserOrders.success({
          response: response.data.data.tribute_shop_orders,
          loadMore: !!nextPage,
        }));
      }
    } catch (e) {
      const response = e.response || e;
      if (response.status === 429) {
        yield put(showAlert({title: 'Error ', msg: response.data.message}));
      } else {
        yield put(showAlert({title: 'Error ', msg: 'Error Get User Orders'}));
      }
      yield put(actions.getPosts.failure());
    } finally {
      onSuccess && onSuccess();
    }
  }
}

export default [
  getUserOrdersSaga,
];


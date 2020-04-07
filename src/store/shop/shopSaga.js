import {call, put, take, takeEvery, takeLatest} from 'redux-saga/effects';
import {actionTypes} from './shopActions';
import {updateCart} from '../cart/cartActions';
import * as actions from './shopActions';
import Api from "../../service/api";
import {showAlert} from "../alert/alertActions";
import {REQUEST} from "../../utils/action";
import {globals} from "../globals";
import {sortCart} from "../../helpers/common";

const {
  GET_GIFTS,
  GET_SHOP_INFO,
  GET_TYPES,
  SWITCH_STATUS_GIFT,
  GET_MAX_PRICE,
  UPDATE_GIFTS_AMOUNT,
} = actionTypes;

/***************************** Sagas ************************************/

function* getGiftsSaga() {
  yield takeLatest(GET_GIFTS[REQUEST], function* (action) {
    const {data: {nextPage, count, newList, pageId, params}, onSuccess} = action;

    const store = globals.store.getState();
    const {editMode} = store.settings;

    const mode = editMode ? 'edit' : 'show';

    try {
      const request = {
        per_page: count,
        order: 'by_stars',
      };

      const requestData = {...request, ...params, mode};

      const response = yield call(Api.get, nextPage || `tributes/${pageId}/shop/gifts`, requestData);

      if (response.status === 200) {
        yield put(actions.getGifts.success({
          response: response.data.data.tribute_gifts,
          loadMore: !!nextPage && !newList,
          paramsForGetGifts: requestData,
        }));
      }
    } catch (e) {
      // const response = e.response || e;
      yield put(actions.getGifts.failure());
      yield put(showAlert({
        title: 'Error get gifts',
        msg: 'errors',
      }));
    } finally {
      onSuccess?.();
    }
  });
}

function* getShopInfoSaga() {
  while (true) {
    yield take(GET_SHOP_INFO[REQUEST]);
    try {
      const response = yield call(Api.get, `tributes/shop/settings`);
      if (response.status === 200) {
        yield put(actions.getShopInfo.success(response.data.data.tribute_shop_settings.data));
      }
    } catch (e) {
      // const response = e.response || e;
      yield put(actions.getShopInfo.failure());
      yield put(showAlert({
        title: 'Error get info',
        msg: 'errors',
      }));
    }
  }
}

function* getTypesSaga() {
  while (true) {
    yield take(GET_TYPES[REQUEST]);
    try {
      const response = yield call(Api.get, `tributes/shop/gifts/types`);
      if (response.status === 200) {
        yield put(actions.getTypes.success(response.data.data.tribute_shop_gift_types.data));
      }
    } catch (e) {
      // const response = e.response || e;
      yield put(actions.getTypes.failure());
      yield put(showAlert({
        title: 'Error get gift types',
        msg: 'errors',
      }));
    }
  }
}

function* updateGiftsAmountSaga() {
  while (true) {
    const {onSuccess} = yield take(UPDATE_GIFTS_AMOUNT[REQUEST]);
    const store = globals.store.getState();
    const cart = store.cart.data;
    const pageId = store.tributePage.data.tribute.id;
    const stringId = store.tributePage.data.tribute.string_id;
    const sortingCart = sortCart(cart);
    const ids = sortingCart.filter(item => item.typeId !== 1).map(({id}) => id);

    if (!ids.length) {
      yield put(actions.updateGiftsAmount.success({ids}));
      onSuccess?.();
    } else {
      try {
        const response = yield call(Api.get, `tributes/${pageId}/shop/gifts/${JSON.stringify(ids)}`, {mode: 'show'});
        if (response.status === 200) {
          const newGifts = response.data.data.tribute_gifts;
          yield put(actions.updateGiftsAmount.success({newGifts, ids}));
          yield put(updateCart.request({pageId, ids, newGifts}));
        }
      } catch (e) {
        yield put(actions.updateGiftsAmount.failure());
        globals.history.push(`/${stringId}#3`);
      } finally {
        onSuccess?.();
      }
    }
  }
}

function* getMaxPriceSaga() {
  while (true) {
    const {data: {pageId}} = yield take(GET_MAX_PRICE[REQUEST]);
    try {
      const response = yield call(Api.get, `tributes/${pageId}/shop/max-price`);
      if (response.status === 200) {
        yield put(actions.getMaxPrice.success(response.data.data.tribute_shop_max_price));
      }
    } catch (e) {
      // const response = e.response || e;
      yield put(actions.getMaxPrice.failure());
      yield put(showAlert({
        title: 'Error get max-price',
        msg: 'errors',
      }));
    }
  }
}

function* switchStatusGiftSaga() {
  yield takeEvery(SWITCH_STATUS_GIFT[REQUEST], function* (action) {
    const {data: {pageId, giftId, status}, onSuccess} = action;
    const value = (status === 'visible' || status === 'stared') || false;
    try {
      const response = yield call(Api.post, `tributes/${pageId}/shop/gifts/${giftId}/make-${status}`);
      if (response.status === 200) {
        const field = (status === 'visible' || status === 'hidden') ? 'is_visible' : 'show_first';
        yield put(actions.switchStatusGift.success({field, value, giftId}));
      }
    } catch (e) {
      const response = e.response || e;
      if (response.status === 429) {
        yield put(showAlert({title: 'Error ', msg: response.data.message}));
      } else {
        yield put(showAlert({
          title: 'Error switch status gift',
          msg: 'errors',
        }));
      }
      yield put(actions.switchStatusGift.failure());
    } finally {
      onSuccess?.();
    }
  });
}

export default [
  getGiftsSaga,
  switchStatusGiftSaga,
  getMaxPriceSaga,
  updateGiftsAmountSaga,
  getShopInfoSaga,
  getTypesSaga,
];


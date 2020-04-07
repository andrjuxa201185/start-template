import {call, put, take} from 'redux-saga/effects';
import {actionTypes} from './checkoutActions';
import * as actions from './checkoutActions';
import Api from "../../service/api";
import Auth from "../../service/auth";
import {showAlert} from "../alert/alertActions";
import {REQUEST} from "../../utils/action";
import {globals} from "../globals";
import {getAllNum} from "../../helpers/common";
import {updateGiftsAmount} from "../shop/shopActions";

const {
  GET_ORDER_TOKEN,
  CHECK_MESSAGE_STEP,
  CHECK_SHIPPING_STEP,
  CHECK_ACCOUNT_STEP,
  PAY,
  TO_PREV_STEP,
  GET_ORDER_CONFIRM,
  CHECK_ORDER_TOKEN,
} = actionTypes;

/***************************** Sagas ************************************/

function* getOrderTokenSaga() {
  while (true) {
    const {data: {pageId, gifts}} = yield take(GET_ORDER_TOKEN[REQUEST]);
    try {
      const requestData = {gifts: JSON.stringify(gifts)};
      const store = globals.store.getState();
      const stringId = store.tributePage.data.tribute.string_id;
      const response = yield call(Api.post, `tributes/${pageId}/shop/orders`, requestData);
      if (response.status === 200) {
        const orderToken = response.data.data.tribute_shop_order_token;
        yield put(actions.getOrderToken.success(orderToken));
        globals.history.push(`/${stringId || pageId}/cart/checkout/${orderToken}`);
        try {
          window.sessionStorage.removeItem('orderConfirm');
        } catch (e) {
          console.log(e);
        }
      }
    } catch (e) {
      const response = e.response || e;
      if (response.status === 422 && response.data.errors['gifts.price_error']) {
        yield put(updateGiftsAmount.request());
        yield put(showAlert({
          title: 'Warning',
          msg: 'Please pay attention to the order price. It was updated.',
        }));
      } else {
        yield put(showAlert({
          title: 'Error',
          msg: 'Error get order token',
        }));
      }
      yield put(actions.getOrderToken.failure());
    }
  }
}

function* checkOrderTokenSaga() {
  while (true) {
    const {data: {pageId, token}} = yield take(CHECK_ORDER_TOKEN[REQUEST]);
    try {
      const response = yield call(Api.get, `tributes/shop/orders/${token}`);
      if (response.status === 200) {
        const order = response.data.data.tribute_shop_order;
        yield put(actions.checkOrderToken.success({
          orderToken: token,
          currentStep: order.current_step,
          processing: order.processing,
          taxes: order.taxes,
          giftNum: order.gift_num,
          giftItemNum: order.gift_item_num,
          giftItemSum: order.gift_item_sum,
          savedInfo: {
            message: order.message,
            message_signature_first_name: order.message_signature_first_name,
            message_signature_last_name: order.message_signature_last_name,
            post_to_tribute_wall: order.post_to_tribute_wall,
            shipping_phone_number: order.shipping_phone_number,
            shipping_address: order.shipping_address,
            shipping_first_name: order.shipping_first_name,
            shipping_last_name: order.shipping_last_name,
          },
        }));
      }
    } catch (e) {
      const response = e.response || e;
      yield put(actions.checkOrderToken.failure());
      if (response.status === 422) {
        globals.history.push(`/${pageId}`);
      }
    }
  }
}

function* checkAccountSaga() {
  while (true) {
    const {data: {email}} = yield take(CHECK_ACCOUNT_STEP[REQUEST]);
    const authToken = Auth.getTokenFromLocalStorage();
    const state = globals.store.getState();
    const {orderToken} = state.checkout.order;
    const requestData = {};
    if (!authToken) {
      requestData.email = email;
    }
    try {
      const response = yield call(Api.post, `tributes/shop/orders/${orderToken}/account-data/set`, requestData);
      if (response.status === 200) {
        yield put(actions.checkAccountStep.success(response.data.data.tribute_shop_order_current_step));
      }
    } catch (e) {
      const response = e.response || e;
      if (response.status === 422) {
        yield put(showAlert({
          title: 'Error',
          msg: response.data.message,
        }));
      } else {
        yield put(showAlert({
          title: 'Error',
          msg: 'error order',
        }));
      }
      yield put(actions.checkAccountStep.failure());
    }
  }
}

function* checkMessageSaga() {
  while (true) {
    const {data: {firstName, lastName, message, isPost, isAddMessage, isAddSignature}} = yield take(CHECK_MESSAGE_STEP[REQUEST]);
    try {
      const state = globals.store.getState();
      const {orderToken} = state.checkout.order;
      const requestData = {post_to_wall: isPost ? '1' : '0'};
      if (isAddMessage) requestData.message = message;
      if (isAddSignature) requestData.first_name = firstName;
      if (isAddSignature && lastName) requestData.last_name = lastName;
      const response = yield call(Api.post, `tributes/shop/orders/${orderToken}/message-data/set`, requestData);
      if (response.status === 200) {
        yield put(actions.checkMessageStep.success({
          step: response.data.data.tribute_shop_order_current_step,
          info: response.data.data.tribute_shop_order_current_step_data,
        }));
      }
    } catch (e) {
      const response = e.response || e;
      if (response.status === 422) {
        yield put(showAlert({
          title: 'Error',
          msg: response.data.message,
        }));
      } else {
        yield put(showAlert({
          title: 'Error',
          msg: 'error order',
        }));
      }
      yield put(actions.checkMessageStep.failure());
    }
  }
}

function* checkShippingSaga() {
  while (true) {
    const {data: {phone, location, firstName, lastName}, cb} = yield take(CHECK_SHIPPING_STEP[REQUEST]);
    try {
      const state = globals.store.getState();
      const {orderToken} = state.checkout.order;

      const requestData = {phone_number: getAllNum(phone)};
      if (location) requestData.address = location;
      if (firstName) requestData.first_name = firstName;
      if (lastName) requestData.last_name = lastName;

      const response = yield call(Api.post, `tributes/shop/orders/${orderToken}/shipping-data/set`, requestData);
      if (response.status === 200) {
        yield put(actions.checkShippingStep.success(response.data.data.tribute_shop_order_current_step));
      }
    } catch (e) {
      const response = e.response || e;
      if (response.status === 422) {
        yield put(showAlert({
          title: 'Error',
          msg: response.data.message,
        }));
      } else {
        yield put(showAlert({
          title: 'Error',
          msg: 'error order',
        }));
      }
      cb?.();
      yield put(actions.checkShippingStep.failure());
    }
  }
}

function* backToPrevStepSaga() {
  while (true) {
    const {data: {location, firstName, lastName, phone}, cb} = yield take(TO_PREV_STEP[REQUEST]);
    try {
      const state = globals.store.getState();
      const {orderToken, currentStep} = state.checkout.order;
      let route = '';
      const requestData = {};
      if (currentStep === 'shipping') {
        route = 'message';
        requestData.address = location || '';
        requestData.first_name = firstName || '';
        requestData.last_name = lastName || '';
        requestData.phone_number = getAllNum(phone) || '';
      }
      if (currentStep === 'billing') {
        route = 'shipping';
      }
      const response = yield call(Api.post, `tributes/shop/orders/${orderToken}/${route}-step/activate`, requestData);

      if (response.status === 200) {
        yield put(actions.backToPrevStep.success({
          step: response.data.data.tribute_shop_order_current_step,
          info: response.data.data.tribute_shop_order_current_step_data,
        }));
      }
    } catch (e) {
      const response = e.response || e;
      if (response.status === 422) {
        yield put(showAlert({
          title: 'Error',
          msg: response.data.message,
        }));
      } else {
        yield put(showAlert({
          title: 'Error',
          msg: 'error get prev step',
        }));
      }
      cb?.();
      yield put(actions.backToPrevStep.failure());
    }
  }
}

function* getOrderConfirmSaga() {
  while (true) {
    yield take(GET_ORDER_CONFIRM[REQUEST]);
    try {
      const orderConfirm = window.sessionStorage.getItem('orderConfirm');
      yield put(actions.getOrderFromSessionStorage.success(JSON.parse(orderConfirm)));
    } catch (e) {
      yield put(actions.getOrderFromSessionStorage.failure());
    }
  }
}

function* paySaga() {
  while (true) {
    const {data: {payment_stripe_method_id, payment_stripe_intent_id, orderToken}, CB} = yield take(PAY[REQUEST]);
    try {
      const requestData = {payment_stripe_method_id, payment_stripe_intent_id};
      const response = yield call(Api.post, `tributes/shop/orders/${orderToken}/place`, requestData);
      if (response.status === 200) {
        const {data, error} = response.data;

        if (error) {
          CB({error});
          yield put(showAlert({title: 'Error pay', msg: error}));
          yield put(actions.pay.success());
        }

        if (data) {
          if (data.payment.requires_action) {
            CB({
              payment_finished: data.payment.payment_finished,
              requires_action: data.payment.requires_action,
              client_secret: data.payment.payment_intent_client_secret,
            });
          }
          yield put(actions.pay.success(data.tribute_shop_order));

          if (data.payment.payment_finished && data.tribute_shop_order?.is_placed && data.tribute_shop_order?.was_payed) {
            yield put(showAlert({
              title: 'Success pay',
              msg: 'Your payment was successful',
            }));
            CB({payment_finished: true});
            try {
              window.sessionStorage.setItem('orderConfirm', JSON.stringify(data.tribute_shop_order));
            } catch (e) {
              console.log(e);
            }
          }
        }
      }
    } catch (e) {
      const response = e.response || e;
      CB({error: 'Error pay'});
      yield put(showAlert({title: 'Error pay', msg: response.data.message}));
      yield put(actions.pay.failure());
    }
  }
}

export default [
  paySaga,
  checkAccountSaga,
  backToPrevStepSaga,
  checkOrderTokenSaga,
  getOrderConfirmSaga,
  checkShippingSaga,
  checkMessageSaga,
  getOrderTokenSaga,
];


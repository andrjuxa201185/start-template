import {actionTypes} from './checkoutActions';
import {FAILURE, REQUEST, SUCCESS} from '../../utils/action';
import Api from "../../service/api";

const {
  CHECK_ORDER_TOKEN,
  CHECK_ACCOUNT_STEP,
  CHECK_SHIPPING_STEP,
  CHECK_MESSAGE_STEP,
  GET_ORDER_TOKEN,
  TO_PREV_STEP,
  PAY,
  GET_ORDER_CONFIRM,
} = actionTypes;

const initialState = {
  order: {},
  stepSavedInfo: null,
  orderConfirm: null,
  dataStatus: Api.initialStatus,
};

export default function checkout(state = initialState, action) {
  const {type, payload} = action;
  switch (type) {
    case CHECK_MESSAGE_STEP[REQUEST]:
    case CHECK_SHIPPING_STEP[REQUEST]:
    case GET_ORDER_TOKEN[REQUEST]:
    case TO_PREV_STEP[REQUEST]:
    case CHECK_ORDER_TOKEN[REQUEST]:
    case GET_ORDER_CONFIRM[REQUEST]:
    case PAY[REQUEST]:
    case CHECK_ACCOUNT_STEP[REQUEST]:
      return {
        ...state,
        dataStatus: Api.requestStatus,
      };
    case GET_ORDER_TOKEN[SUCCESS]:
      return {
        ...state,
        order: {
          ...state.order,
          orderToken: payload.orderToken,
        },
        dataStatus: Api.successStatus,
      };
    case CHECK_ORDER_TOKEN[SUCCESS]: {
      const {
        currentStep, taxes, savedInfo,
        processing, orderToken, giftNum, giftItemNum, giftItemSum,
      } = payload;
      return {
        ...state,
        order: {
          ...state.order,
          orderToken,
          currentStep,
          taxes,
          processing,
          giftNum,
          giftItemNum,
          giftItemSum,
        },
        stepSavedInfo: savedInfo,
        dataStatus: Api.successStatus,
      };
    }
    case CHECK_ACCOUNT_STEP[SUCCESS]:
    case CHECK_SHIPPING_STEP[SUCCESS]: {
      return {
        ...state,
        order: {
          ...state.order,
          currentStep: payload,
        },
        dataStatus: Api.successStatus,
      };
    }
    case CHECK_MESSAGE_STEP[SUCCESS]: {
      return {
        ...state,
        order: {
          ...state.order,
          currentStep: payload.step,
        },
        stepSavedInfo: payload.info,
        dataStatus: Api.successStatus,
      };
    }
    case PAY[SUCCESS]:
    case GET_ORDER_CONFIRM[SUCCESS]:
      return {
        ...state,
        orderConfirm: payload || null,
        dataStatus: Api.successStatus,
      };
    case TO_PREV_STEP[SUCCESS]:
      return {
        ...state,
        order: {
          ...state.order,
          currentStep: payload.step,
        },
        stepSavedInfo: payload.info,
        dataStatus: Api.successStatus,
      };
    case CHECK_MESSAGE_STEP[FAILURE]:
    case CHECK_ACCOUNT_STEP[FAILURE]:
    case CHECK_SHIPPING_STEP[FAILURE]:
    case PAY[FAILURE]:
    case GET_ORDER_CONFIRM[FAILURE]:
    case TO_PREV_STEP[FAILURE]:
    case GET_ORDER_TOKEN[FAILURE]:
    case CHECK_ORDER_TOKEN[FAILURE]:
      return {
        ...state,
        dataStatus: Api.failStatus,
      };
    default:
      return state;
  }
}

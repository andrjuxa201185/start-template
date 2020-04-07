import action, {
  createRequestActionTypes,
  REQUEST, SUCCESS, FAILURE,
} from '../../utils/action';

export const actionTypes = {
  ...createRequestActionTypes('CHECKOUT', {
    GET_ORDER_TOKEN: 'GET_ORDER_TOKEN',
    CHECK_ORDER_TOKEN: 'CHECK_ORDER_TOKEN',
    CHECK_ACCOUNT_STEP: 'CHECK_ACCOUNT_STEP',
    CHECK_MESSAGE_STEP: 'CHECK_MESSAGE_STEP',
    CHECK_SHIPPING_STEP: 'CHECK_SHIPPING_STEP',
    TO_PREV_STEP: 'TO_PREV_STEP',
    PAY: 'PAY',
    GET_ORDER_CONFIRM: 'GET_ORDER_CONFIRM',
  }),
};

export const getOrderToken = {
  request: data => action(actionTypes.GET_ORDER_TOKEN[REQUEST], {data}),
  success: payload => action(actionTypes.GET_ORDER_TOKEN[SUCCESS], {payload}),
  failure: () => action(actionTypes.GET_ORDER_TOKEN[FAILURE]),
};

export const checkOrderToken = {
  request: data => action(actionTypes.CHECK_ORDER_TOKEN[REQUEST], {data}),
  success: payload => action(actionTypes.CHECK_ORDER_TOKEN[SUCCESS], {payload}),
  failure: () => action(actionTypes.CHECK_ORDER_TOKEN[FAILURE]),
};

export const checkAccountStep = {
  request: (data, onSuccess) => action(actionTypes.CHECK_ACCOUNT_STEP[REQUEST], {
    data,
    onSuccess,
  }),
  success: payload => action(actionTypes.CHECK_ACCOUNT_STEP[SUCCESS], {payload}),
  failure: () => action(actionTypes.CHECK_ACCOUNT_STEP[FAILURE]),
};

export const checkMessageStep = {
  request: data => action(actionTypes.CHECK_MESSAGE_STEP[REQUEST], {data}),
  success: payload => action(actionTypes.CHECK_MESSAGE_STEP[SUCCESS], {payload}),
  failure: () => action(actionTypes.CHECK_MESSAGE_STEP[FAILURE]),
};

export const backToPrevStep = {
  request: (data, cb) => action(actionTypes.TO_PREV_STEP[REQUEST], {data, cb}),
  success: payload => action(actionTypes.TO_PREV_STEP[SUCCESS], {payload}),
  failure: () => action(actionTypes.TO_PREV_STEP[FAILURE]),
};

export const checkShippingStep = {
  request: (data, cb) => action(actionTypes.CHECK_SHIPPING_STEP[REQUEST], {
    data,
    cb,
  }),
  success: payload => action(actionTypes.CHECK_SHIPPING_STEP[SUCCESS], {payload}),
  failure: () => action(actionTypes.CHECK_SHIPPING_STEP[FAILURE]),
};

export const pay = {
  request: (data, CB) => action(actionTypes.PAY[REQUEST], {
    data,
    CB,
  }),
  success: payload => action(actionTypes.PAY[SUCCESS], {payload}),
  failure: () => action(actionTypes.PAY[FAILURE]),
};

export const getOrderFromSessionStorage = {
  request: () => action(actionTypes.GET_ORDER_CONFIRM[REQUEST]),
  success: payload => action(actionTypes.GET_ORDER_CONFIRM[SUCCESS], {payload}),
  failure: () => action(actionTypes.GET_ORDER_CONFIRM[FAILURE]),
};

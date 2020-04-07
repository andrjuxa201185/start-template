import action, {
  createRequestActionTypes,
  REQUEST, SUCCESS, FAILURE,
} from '../../utils/action';

export const actionTypes = {
  CHECK_TIME_CART: 'CHECK_TIME_CART',
  ...createRequestActionTypes('CART', {
    ADD_TO_CART: 'ADD_TO_CART',
    REMOVE_ONE: 'REMOVE_ONE',
    CHANGE_AMOUNT: 'CHANGE_AMOUNT',
    GET_CART: 'GET_CART',
    REMOVE_PRODUCT: 'REMOVE_PRODUCT',
    UPDATE_CART: 'REMOVE_PRODUCT',
    CLEAR_CART: 'CLEAR_CART',
  }),
};

export const addToCart = {
  request: data => action(actionTypes.ADD_TO_CART[REQUEST], {data}),
  success: payload => action(actionTypes.ADD_TO_CART[SUCCESS], {payload}),
  failure: () => action(actionTypes.ADD_TO_CART[FAILURE]),
};

export const clearCart = {
  request: data => action(actionTypes.CLEAR_CART[REQUEST], {data}),
  success: payload => action(actionTypes.CLEAR_CART[SUCCESS], {payload}),
  failure: () => action(actionTypes.CLEAR_CART[FAILURE]),
};

export const changeAmount = {
  request: data => action(actionTypes.CHANGE_AMOUNT[REQUEST], {data}),
  success: payload => action(actionTypes.CHANGE_AMOUNT[SUCCESS], {payload}),
  failure: () => action(actionTypes.CHANGE_AMOUNT[FAILURE]),
};

export const removeOneProduct = {
  request: data => action(actionTypes.REMOVE_ONE[REQUEST], {data}),
  success: payload => action(actionTypes.REMOVE_ONE[SUCCESS], {payload}),
  failure: () => action(actionTypes.REMOVE_ONE[FAILURE]),
};

export const getCart = {
  request: data => action(actionTypes.GET_CART[REQUEST], {data}),
  success: payload => action(actionTypes.GET_CART[SUCCESS], {payload}),
  failure: () => action(actionTypes.GET_CART[FAILURE]),
};

export const updateCart = {
  request: data => action(actionTypes.UPDATE_CART[REQUEST], {data}),
  success: payload => action(actionTypes.UPDATE_CART[SUCCESS], {payload}),
  failure: () => action(actionTypes.UPDATE_CART[FAILURE]),
};

export const removeProduct = {
  request: data => action(actionTypes.REMOVE_PRODUCT[REQUEST], {data}),
  success: payload => action(actionTypes.REMOVE_PRODUCT[SUCCESS], {payload}),
  failure: () => action(actionTypes.REMOVE_PRODUCT[FAILURE]),
};

export const checkTimeCart = () => action(actionTypes.CHECK_TIME_CART);

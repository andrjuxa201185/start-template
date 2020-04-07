import action, {
  createRequestActionTypes,
  REQUEST, SUCCESS, FAILURE,
} from '../../utils/action';

export const actionTypes = {
  CLEAR_GIFTS: 'CLEAR_GIFTS',
  ...createRequestActionTypes('SHOP', {
    GET_GIFTS: 'GET_GIFTS',
    GET_MAX_PRICE: 'GET_MAX_PRICE',
    GET_SHOP_INFO: 'GET_SHOP_INFO',
    GET_TYPES: 'GET_TYPES',
    SWITCH_STATUS_GIFT: 'SWITCH_STATUS_GIFT',
    UPDATE_GIFTS_AMOUNT: 'UPDATE_GIFTS_AMOUNT',
  }),
};

export const clearGifts = () => action(actionTypes.CLEAR_GIFTS);

export const getGifts = {
  request: (data, onSuccess) => action(actionTypes.GET_GIFTS[REQUEST], {
    data,
    onSuccess,
  }),
  success: payload => action(actionTypes.GET_GIFTS[SUCCESS], {payload}),
  failure: () => action(actionTypes.GET_GIFTS[FAILURE]),
};

export const updateGiftsAmount = {
  request: onSuccess => action(actionTypes.UPDATE_GIFTS_AMOUNT[REQUEST], {onSuccess}),
  success: payload => action(actionTypes.UPDATE_GIFTS_AMOUNT[SUCCESS], {payload}),
  failure: () => action(actionTypes.UPDATE_GIFTS_AMOUNT[FAILURE]),
};

export const getShopInfo = {
  request: data => action(actionTypes.GET_SHOP_INFO[REQUEST], {data}),
  success: payload => action(actionTypes.GET_SHOP_INFO[SUCCESS], {payload}),
  failure: () => action(actionTypes.GET_SHOP_INFO[FAILURE]),
};

export const getTypes = {
  request: () => action(actionTypes.GET_TYPES[REQUEST]),
  success: payload => action(actionTypes.GET_TYPES[SUCCESS], {payload}),
  failure: () => action(actionTypes.GET_TYPES[FAILURE]),
};

export const getMaxPrice = {
  request: data => action(actionTypes.GET_MAX_PRICE[REQUEST], {data}),
  success: payload => action(actionTypes.GET_MAX_PRICE[SUCCESS], {payload}),
  failure: () => action(actionTypes.GET_MAX_PRICE[FAILURE]),
};

export const switchStatusGift = {
  request: (data, onSuccess) => action(actionTypes.SWITCH_STATUS_GIFT[REQUEST], {
    data,
    onSuccess,
  }),
  success: payload => action(actionTypes.SWITCH_STATUS_GIFT[SUCCESS], {payload}),
  failure: () => action(actionTypes.SWITCH_STATUS_GIFT[FAILURE]),
};


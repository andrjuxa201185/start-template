import action, {
  createRequestActionTypes,
  REQUEST, SUCCESS, FAILURE,
} from '../../utils/action';

export const actionTypes = {
  CLEAR: 'CLEAR',
  ...createRequestActionTypes('USER_ORDERS', {
    GET: 'GET',
  }),
};

export const clearOrders = () => action(actionTypes.CLEAR);

export const getUserOrders = {
  request: (data, onSuccess) => action(actionTypes.GET[REQUEST], {
    data,
    onSuccess,
  }),
  success: payload => action(actionTypes.GET[SUCCESS], {payload}),
  failure: () => action(actionTypes.GET[FAILURE]),
};


import action, {
  createRequestActionTypes,
  REQUEST, SUCCESS, FAILURE,
} from '../../utils/action';

export const actionTypes = {
  LOGOUT: 'LOGOUT',
  ...createRequestActionTypes('AUTH', {
    LOGIN: 'LOGIN',
  }),
};

export const logout = () => action(actionTypes.LOGOUT);

export const login = {
  request: data => action(actionTypes.LOGIN[REQUEST], {data}),
  success: payload => action(actionTypes.LOGIN[SUCCESS], {payload}),
  failure: () => action(actionTypes.LOGIN[FAILURE]),
};


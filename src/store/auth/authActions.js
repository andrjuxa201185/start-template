import action, {
  createRequestActionTypes,
  REQUEST, SUCCESS, FAILURE,
} from '../../utils/action';

export const actionTypes = {
  LOGOUT: 'LOGOUT',
  VERIFICATION: 'VERIFICATION',
  ...createRequestActionTypes('AUTH', {
    CHANGE_PASSWORD: 'CHANGE_PASSWORD',
    FORGOT_PASSWORD: 'FORGOT_PASSWORD',
    LOGIN: 'LOGIN',
    FORCE_LOGIN: 'FORCE_LOGIN',
    LOGIN_GOOGLE: 'LOGIN_GOOGLE',
    LOGIN_FACEBOOK: 'LOGIN_FACEBOOK',
    REGISTRATION: 'REGISTRATION',
    REFRESH_TOKEN: 'REFRESH_TOKEN',
  }),
};

export const logout = () => action(actionTypes.LOGOUT);

export const changePassword = {
  request: (data, onSuccess) => action(actionTypes.CHANGE_PASSWORD[REQUEST], {data, onSuccess}),
  success: () => action(actionTypes.CHANGE_PASSWORD[SUCCESS]),
  failure: () => action(actionTypes.CHANGE_PASSWORD[FAILURE]),
};

export const forgotPassword = {
  request: (data, onSuccess) => action(actionTypes.FORGOT_PASSWORD[REQUEST], {data, onSuccess}),
  success: () => action(actionTypes.FORGOT_PASSWORD[SUCCESS]),
  failure: () => action(actionTypes.FORGOT_PASSWORD[FAILURE]),
};

export const login = {
  request: data => action(actionTypes.LOGIN[REQUEST], {data}),
  success: payload => action(actionTypes.LOGIN[SUCCESS], {payload}),
  failure: () => action(actionTypes.LOGIN[FAILURE]),
};

export const forceLogin = {
  request: data => action(actionTypes.FORCE_LOGIN[REQUEST], {data}),
  success: payload => action(actionTypes.FORCE_LOGIN[SUCCESS], {payload}),
  failure: () => action(actionTypes.FORCE_LOGIN[FAILURE]),
};

export const loginGoogle = {
  request: data => action(actionTypes.LOGIN_GOOGLE[REQUEST], {data}),
  success: payload => action(actionTypes.LOGIN_GOOGLE[SUCCESS], {payload}),
  failure: () => action(actionTypes.LOGIN_GOOGLE[FAILURE]),
};

export const loginFacebook = {
  request: data => action(actionTypes.LOGIN_FACEBOOK[REQUEST], {data}),
  success: payload => action(actionTypes.LOGIN_FACEBOOK[SUCCESS], {payload}),
  failure: () => action(actionTypes.LOGIN_FACEBOOK[FAILURE]),
};

export const registration = {
  request: data => action(actionTypes.REGISTRATION[REQUEST], {data}),
  success: payload => action(actionTypes.REGISTRATION[SUCCESS], {payload}),
  failure: () => action(actionTypes.REGISTRATION[FAILURE]),
};

export const verification = data => action(actionTypes.VERIFICATION, {data});

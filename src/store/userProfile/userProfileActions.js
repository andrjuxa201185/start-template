import action, {
  createRequestActionTypes,
  REQUEST, SUCCESS, FAILURE,
} from '../../utils/action';

export const actionTypes = {
  ...createRequestActionTypes('USER_PROFILE', {
    CHANGE_PASSWORD: 'CHANGE_PASSWORD',
    CHANGE_EMAIL: 'CHANGE_EMAIL',
    GET: 'GET',
    CHANGE_PHOTO: 'CHANGE_PHOTO',
    CHANGE_PHONE: 'CHANGE_PHONE',
    CHANGE_PROFILE: 'CHANGE_PROFILE',
    GET_IS_SET_PW: 'GET_IS_SET_PW',
  }),
};

export const getUserProfile = {
  request: () => action(actionTypes.GET[REQUEST]),
  success: payload => action(actionTypes.GET[SUCCESS], {payload}),
  failure: () => action(actionTypes.GET[FAILURE]),
};

export const changePasswordUI = {
  request: (data, onSuccess) => action(actionTypes.CHANGE_PASSWORD[REQUEST], {data, onSuccess}),
  success: payload => action(actionTypes.CHANGE_PASSWORD[SUCCESS], {payload}),
  failure: () => action(actionTypes.CHANGE_PASSWORD[FAILURE]),
};

export const changeEmailUI = {
  request: (data, onSuccess) => action(actionTypes.CHANGE_EMAIL[REQUEST], {data, onSuccess}),
  success: payload => action(actionTypes.CHANGE_EMAIL[SUCCESS], {payload}),
  failure: () => action(actionTypes.CHANGE_EMAIL[FAILURE]),
};

export const changePhoto = {
  request: data => action(actionTypes.CHANGE_PHOTO[REQUEST], {data}),
  success: payload => action(actionTypes.CHANGE_PHOTO[SUCCESS], {payload}),
  failure: () => action(actionTypes.CHANGE_PHOTO[FAILURE]),
};

export const changePhone = {
  request: data => action(actionTypes.CHANGE_PHONE[REQUEST], {data}),
  success: payload => action(actionTypes.CHANGE_PHONE[SUCCESS], {payload}),
  failure: () => action(actionTypes.CHANGE_PHONE[FAILURE]),
};

export const changeProfile = {
  request: data => action(actionTypes.CHANGE_PROFILE[REQUEST], {data}),
  success: payload => action(actionTypes.CHANGE_PROFILE[SUCCESS], {payload}),
  failure: () => action(actionTypes.CHANGE_PROFILE[FAILURE]),
};

export const getIsSetPassword = {
  request: cb => action(actionTypes.GET_IS_SET_PW[REQUEST], {cb}),
  success: payload => action(actionTypes.GET_IS_SET_PW[SUCCESS], {payload}),
  failure: () => action(actionTypes.GET_IS_SET_PW[FAILURE]),
};

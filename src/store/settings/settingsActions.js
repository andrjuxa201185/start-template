import action, {
  createRequestActionTypes,
  REQUEST, SUCCESS, FAILURE,
} from '../../utils/action';

export const actionTypes = {
  SET_EDIT_MODE: 'SET_EDIT_MODE',
  ...createRequestActionTypes('RSVP', {
    GET_CONTACT_INFO: 'GET_CONTACT_INFO',
    CHECK_CAPTCHA: 'CHECK_CAPTCHA',
  }),
};

export const setEditMode = payload => action(actionTypes.SET_EDIT_MODE, {payload});

export const getContactInfo = {
  request: () => action(actionTypes.GET_CONTACT_INFO[REQUEST]),
  success: payload => action(actionTypes.GET_CONTACT_INFO[SUCCESS], {payload}),
  failure: () => action(actionTypes.GET_CONTACT_INFO[FAILURE]),
};

export const checkCaptcha = {
  request: (data, onSuccess) => action(actionTypes.CHECK_CAPTCHA[REQUEST], {data,onSuccess}),
  success: payload => action(actionTypes.CHECK_CAPTCHA[SUCCESS], {payload}),
  failure: () => action(actionTypes.CHECK_CAPTCHA[FAILURE]),
};

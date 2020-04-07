import action, {
  createRequestActionTypes,
  REQUEST, SUCCESS, FAILURE,
} from '../../utils/action';

export const actionTypes = {
  ...createRequestActionTypes('CONTACTS', {
    GET_SOCIAL_CONTACTS: 'GET_SOCIAL_CONTACTS',
    GET_USER_CONTACTS: 'GET_USER_CONTACTS',
    GET_USER_EMAIL_CONTACTS: 'GET_USER_EMAIL_CONTACTS',
    CLEAR_CONTACTS: 'CLEAR_CONTACTS',
  }),
};

export const clearContacts = () => action(actionTypes.CLEAR_CONTACTS);

export const getSocialContacts = {
  request: data => action(actionTypes.GET_SOCIAL_CONTACTS[REQUEST], {data}),
  success: payload => action(actionTypes.GET_SOCIAL_CONTACTS[SUCCESS], {payload}),
  failure: () => action(actionTypes.GET_SOCIAL_CONTACTS[FAILURE]),
};

export const getUserContacts = {
  request: data => action(actionTypes.GET_USER_CONTACTS[REQUEST], {data}),
  success: payload => action(actionTypes.GET_USER_CONTACTS[SUCCESS], {payload}),
  failure: () => action(actionTypes.GET_USER_CONTACTS[FAILURE]),
};

export const getUserEmailContacts = {
  request: data => action(actionTypes.GET_USER_EMAIL_CONTACTS[REQUEST], {data}),
  success: payload => action(actionTypes.GET_USER_EMAIL_CONTACTS[SUCCESS], {payload}),
  failure: () => action(actionTypes.GET_USER_EMAIL_CONTACTS[FAILURE]),
};


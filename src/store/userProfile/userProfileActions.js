import action, {
  createRequestActionTypes,
  REQUEST, SUCCESS, FAILURE,
} from '../../utils/action';

export const actionTypes = {
  ...createRequestActionTypes('USER_PROFILE', {
    CHANGE_EMAIL: 'CHANGE_EMAIL',
    GET: 'GET',
    CHANGE_PHOTO: 'CHANGE_PHOTO',
  }),
};

export const getUserProfile = {
  request: () => action(actionTypes.GET[REQUEST]),
  success: payload => action(actionTypes.GET[SUCCESS], {payload}),
  failure: () => action(actionTypes.GET[FAILURE]),
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


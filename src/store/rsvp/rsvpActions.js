import action, {
  createRequestActionTypes,
  REQUEST, SUCCESS, FAILURE,
} from '../../utils/action';

export const actionTypes = {
  CLEAR_RSVPS: 'CLEAR_RSVPS',
  ...createRequestActionTypes('RSVP', {
    CREATE_RSVP: 'CREATE_RSVP',
    UPDATE_RSVP: 'UPDATE_RSVP',
    CREATE_REVIEW: 'CREATE_REVIEW',
    GET_RSVPS: 'GET_RSVPS',
    GET_RSVP: 'GET_RSVP',
    SWITCH_STATUS: 'SWITCH_STATUS',
    DOWNLOAD_RSVP_LIST: 'DOWNLOAD_RSVP_LIST',
  }),
};

export const createRsvp = {
  request: (data, onSuccess) => action(actionTypes.CREATE_RSVP[REQUEST], {data, onSuccess}),
  success: payload => action(actionTypes.CREATE_RSVP[SUCCESS], {payload}),
  failure: () => action(actionTypes.CREATE_RSVP[FAILURE]),
};

export const updateRsvp = {
  request: (data, onSuccess) => action(actionTypes.UPDATE_RSVP[REQUEST], {data, onSuccess}),
  success: payload => action(actionTypes.UPDATE_RSVP[SUCCESS], {payload}),
  failure: () => action(actionTypes.UPDATE_RSVP[FAILURE]),
};

export const createReview = {
  request: (data, onSuccess) => action(actionTypes.CREATE_REVIEW[REQUEST], {data, onSuccess}),
  success: () => action(actionTypes.CREATE_REVIEW[SUCCESS]),
  failure: () => action(actionTypes.CREATE_REVIEW[FAILURE]),
};

export const getRsvps = {
  request: (data, onSuccess) => action(actionTypes.GET_RSVPS[REQUEST], {data, onSuccess}),
  success: payload => action(actionTypes.GET_RSVPS[SUCCESS], {payload}),
  failure: () => action(actionTypes.GET_RSVPS[FAILURE]),
};

export const getRsvp = {
  request: data => action(actionTypes.GET_RSVP[REQUEST], {data}),
  success: payload => action(actionTypes.GET_RSVP[SUCCESS], {payload}),
  failure: () => action(actionTypes.GET_RSVP[FAILURE]),
};

export const switchStatus = {
  request: (data, onSuccess) => action(actionTypes.SWITCH_STATUS[REQUEST], {data, onSuccess}),
  success: payload => action(actionTypes.SWITCH_STATUS[SUCCESS], {payload}),
  failure: () => action(actionTypes.SWITCH_STATUS[FAILURE]),
};

export const downloadRsvpList = {
  request: (data, onSuccess) => action(actionTypes.DOWNLOAD_RSVP_LIST[REQUEST], {data, onSuccess}),
  success: payload => action(actionTypes.DOWNLOAD_RSVP_LIST[SUCCESS], {payload}),
  failure: () => action(actionTypes.DOWNLOAD_RSVP_LIST[FAILURE]),
};

export const clearRsvps = () => action(actionTypes.CLEAR_RSVPS);

import action, {
  createRequestActionTypes,
  REQUEST, SUCCESS, FAILURE,
} from '../../utils/action';

export const actionTypes = {
  CLEAR_EVENTS:'CLEAR_EVENTS',
  ...createRequestActionTypes('EVENTS', {
    GET: 'GET',
    GET_ONE: 'GET_ONE',
    GET_WITH_LOCATION: 'GET_WITH_LOCATION',
    CREATE: 'CREATE',
    UPDATE: 'UPDATE',
    DELETE: 'DELETE',
  }),
};

export const getEvents = {
  request: data => action(actionTypes.GET[REQUEST], {data}),
  success: payload => action(actionTypes.GET[SUCCESS], {payload}),
  failure: () => action(actionTypes.GET[FAILURE]),
};

export const getEvent = {
  request: data => action(actionTypes.GET_ONE[REQUEST], {data}),
  success: payload => action(actionTypes.GET_ONE[SUCCESS], {payload}),
  failure: () => action(actionTypes.GET_ONE[FAILURE]),
};

export const getEventsWithLocation = {
  request: data => action(actionTypes.GET_WITH_LOCATION[REQUEST], {data}),
  success: payload => action(actionTypes.GET_WITH_LOCATION[SUCCESS], {payload}),
  failure: () => action(actionTypes.GET_WITH_LOCATION[FAILURE]),
};

export const createEvent = {
  request: (data, onSuccess) => action(actionTypes.CREATE[REQUEST], {data, onSuccess}),
  success: payload => action(actionTypes.CREATE[SUCCESS], {payload}),
  failure: () => action(actionTypes.CREATE[FAILURE]),
};

export const updateEvent = {
  request: (data, onSuccess) => action(actionTypes.UPDATE[REQUEST], {data, onSuccess}),
  success: payload => action(actionTypes.UPDATE[SUCCESS], {payload}),
  failure: () => action(actionTypes.UPDATE[FAILURE]),
};

export const deleteEvent = {
  request: data => action(actionTypes.DELETE[REQUEST], {data}),
  success: payload => action(actionTypes.DELETE[SUCCESS], {payload}),
  failure: () => action(actionTypes.DELETE[FAILURE]),
};

export const clearEvents = () => action(actionTypes.CLEAR_EVENTS);

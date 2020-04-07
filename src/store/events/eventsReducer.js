import {actionTypes} from './eventsActions';
import {REQUEST, SUCCESS, FAILURE} from '../../utils/action';
import Api from "../../service/api";

const {
  CREATE,
  UPDATE,
  GET,
  GET_WITH_LOCATION,
  CLEAR_EVENTS,
  GET_ONE,
  DELETE,
} = actionTypes;

const initialState = {
  data: {
    upcoming: {
      data: [],
      nextPage: null,
    },
    past: {
      data: [],
      nextPage: null,
    },
    none: {
      data: [],
      nextPage: null,
    },
  },
  event: null,
  eventsWithLocation: [],
  dataStatus: Api.initialStatus,
};

export default function events(state = initialState, action) {
  const {type, payload} = action;
  switch (type) {
    case CREATE[REQUEST]:
    case GET_ONE[REQUEST]:
    case GET[REQUEST]:
    case UPDATE[REQUEST]:
    case GET_WITH_LOCATION[REQUEST]:
    case DELETE[REQUEST]:
      return {
        ...state,
        dataStatus: Api.requestStatus,
      };
    case CLEAR_EVENTS:
      return {
        ...initialState,
      };
    case GET_WITH_LOCATION[SUCCESS]:
      return {
        ...state,
        eventsWithLocation: payload,
        dataStatus: Api.successStatus,
      };
    case GET_ONE[SUCCESS]:
      return {
        ...state,
        event: payload,
        dataStatus: Api.successStatus,
      };
    case UPDATE[SUCCESS]:
      return {
        ...state,
        data: {
          ...state.data,
          upcoming: {
            ...state.data.upcoming,
            data: [
              ...state.data.upcoming.data.map(event => {
                if (event.id !== payload.id) {
                  return event;
                }
                return payload;
              }),
            ],
          },
          none: {
            ...state.data.none,
            data: [
              ...state.data.none.data.map(event => {
                if (event.id !== payload.id) {
                  return event;
                }
                return payload;
              }),
            ],
          },
        },
        dataStatus: Api.successStatus,
      };
    case CREATE[SUCCESS]: {
      const type = payload.starts_at ? 'upcoming' : 'none';
      return {
        ...state,
        data: {
          ...state.data,
          [type]: {
            ...state.data[type],
            data: [payload, ...state.data[type].data],
          },
        },
        dataStatus: Api.successStatus,
      };
    }
    case DELETE[SUCCESS]:
      return {
        ...state,
        data: {
          none: {
            ...state.data.none,
            data: [
              ...state.data.none.data.filter(({id}) => id !== payload),
            ],
          },
          past: {
            ...state.data.past,
            data: [
              ...state.data.past.data.filter(({id}) => id !== payload),
            ],
          },
          upcoming: {
            ...state.data.upcoming,
            data: [
              ...state.data.upcoming.data.filter(({id}) => id !== payload),
            ],
          },
        },
        dataStatus: Api.successStatus,
      };
    case GET[SUCCESS]: {
      const {response, loadMore, type} = payload;
      const data = loadMore ? [...state.data[type].data, ...response.data] : response.data;
      return {
        ...state,
        data: {
          ...state.data,
          [type]: {
            data,
            nextPage: response.next_page_url,
          },
        },
        dataStatus: Api.successStatus,
      };
    }
    case CREATE[FAILURE]:
    case GET[FAILURE]:
    case GET_WITH_LOCATION[FAILURE]:
    case UPDATE[FAILURE]:
    case DELETE[FAILURE]:
    case GET_ONE[FAILURE]:
      return {
        ...state,
        dataStatus: Api.failStatus,
      };
    default:
      return state;
  }
}

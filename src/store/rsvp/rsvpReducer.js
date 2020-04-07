import {actionTypes} from './rsvpActions';
import {REQUEST, SUCCESS, FAILURE} from '../../utils/action';
import Api from "../../service/api";

const {
  CREATE_RSVP,
  CREATE_REVIEW,
  GET_RSVPS,
  UPDATE_RSVP,
  CLEAR_RSVPS,
  GET_RSVP,
  DOWNLOAD_RSVP_LIST,
  SWITCH_STATUS,
} = actionTypes;

const initialState = {
  data: [],
  nextPage: null,
  count: {
    attending: 0,
    declining: 0,
    total: 0,
  },
  dataStatus: Api.initialStatus,
};

export default function rsvp(state = initialState, action) {
  const {type, payload} = action;
  switch (type) {
    case CREATE_REVIEW[REQUEST]:
    case CREATE_RSVP[REQUEST]:
    case UPDATE_RSVP[REQUEST]:
    case GET_RSVPS[REQUEST]:
    case GET_RSVP[REQUEST]:
    case DOWNLOAD_RSVP_LIST[REQUEST]:
      return {
        ...state,
        dataStatus: Api.requestStatus,
      };
    case SWITCH_STATUS[REQUEST]:
      return {
        ...state,
      };
    case CREATE_RSVP[SUCCESS]:
      return {
        ...state,
        data: [
          payload,
          ...state.data,
        ],
        count: {
          ...state.count,
          [payload.status]: payload.status === 'attending'
            ? +state.count[payload.status] + Number(payload.total_number_of_people)
            : +state.count[payload.status] + 1,
          total: state.count.total + 1,
        },
        dataStatus: Api.successStatus,
      };
    case UPDATE_RSVP[SUCCESS]:
    case SWITCH_STATUS[SUCCESS]:{
      let prevStatus = '';
      let prevNumbPeople = 0;
      state.data.forEach(item => {
        if (item.id === payload.id) {
          prevStatus = item.status;
          prevNumbPeople = item.total_number_of_people;
        }
      });
      const isChangedStatus = prevStatus !== payload.status;
      return {
        ...state,
        data: state.data.map(item => {
            if (item.id !== payload.id) {
              return item;
            }
            return payload;
          }),
        count: {
          ...state.count,
          attending: isChangedStatus
            ? prevStatus === 'declining'
              ? +state.count.attending + Number(payload.total_number_of_people)
              : +state.count.attending - prevNumbPeople
            : payload.status === 'attending'
              ? +state.count.attending - prevNumbPeople + Number(payload.total_number_of_people)
              : state.count.attending,
          declining: isChangedStatus
            ? prevStatus === 'declining'
              ? +state.count.declining - 1
              : +state.count.declining + 1
            : state.count.declining,
        },
        dataStatus: Api.successStatus,
      };
    }
    case GET_RSVP[SUCCESS]:
      return {
        ...state,
        data: [
          ...state.data.map(rsvp => {
            if (rsvp.id !== payload.id) {
              return rsvp;
            }
            return payload;
          }),
        ],
        dataStatus: Api.successStatus,
      };
    case GET_RSVPS[SUCCESS]: {
      const {response, loadMore, count, people} = payload;
      const dataMap = new Map();
      const dataUnicId = [];
      const data = loadMore ? [...state.data, ...response.data] : response.data;
      data.forEach(item => dataMap.set(item.id, item));
      for (let val of dataMap.values()) {
        dataUnicId.push(val);
      }
      return {
        ...state,
        count: {
          attending: people,
          declining: count.declining,
          total: count.total,
        },
        nextPage: response.next_page_url,
        data: dataUnicId,
        dataStatus: Api.successStatus,
      };
    }
    case CLEAR_RSVPS:
      return {
        ...initialState,
      };
    case CREATE_REVIEW[SUCCESS]:
    case DOWNLOAD_RSVP_LIST[SUCCESS]:
      return {
        ...state,
        dataStatus: Api.successStatus,
      };
    case CREATE_RSVP[FAILURE]:
    case GET_RSVPS[FAILURE]:
    case UPDATE_RSVP[FAILURE]:
    case CREATE_REVIEW[FAILURE]:
    case GET_RSVP[FAILURE]:
    case SWITCH_STATUS[FAILURE]:
    case DOWNLOAD_RSVP_LIST[FAILURE]:
      return {
        ...state,
        dataStatus: Api.failStatus,
      };
    default:
      return state;
  }
}

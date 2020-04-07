import {actionTypes} from './contactsActions';
import {REQUEST, SUCCESS, FAILURE} from '../../utils/action';
import Api from "../../service/api";

const {
  GET_USER_CONTACTS,
  GET_USER_EMAIL_CONTACTS,
  GET_SOCIAL_CONTACTS,
  CLEAR_CONTACTS,
} = actionTypes;

const initialState = {
  data: {
    socialContacts: [],
    userContacts: [],
    userEmailContacts: [],
  },
  dataStatus: Api.initialStatus,
};

export default function contacts(state = initialState, action) {
  const {type, payload} = action;
  switch (type) {
    case GET_SOCIAL_CONTACTS[REQUEST]:
    case GET_USER_CONTACTS[REQUEST]:
    case GET_USER_EMAIL_CONTACTS[REQUEST]:
      return {
        ...state,
        dataStatus: Api.requestStatus,
      };
    case GET_SOCIAL_CONTACTS[SUCCESS]:
      return {
        ...state,
        data: {
          ...state.data,
          socialContacts: payload,
        },
        dataStatus: Api.successStatus,
      };
    case GET_USER_CONTACTS[SUCCESS]:
      return {
        ...state,
        data: {
          ...state.data,
          userContacts: payload,
        },
        dataStatus: Api.successStatus,
      };
    case GET_USER_EMAIL_CONTACTS[SUCCESS]:
      return {
        ...state,
        data: {
          ...state.data,
          userEmailContacts: payload,
        },
        dataStatus: Api.successStatus,
      };
    case CLEAR_CONTACTS:
      return {
        ...state,
        data: {
          ...state.data,
          socialContacts: [],
          userContacts: [],
          userEmailContacts: [],
        },
        dataStatus: Api.successStatus,
      };
    case GET_SOCIAL_CONTACTS[FAILURE]:
    case GET_USER_CONTACTS[FAILURE]:
    case GET_USER_EMAIL_CONTACTS[FAILURE]:
      return {
        ...state,
        dataStatus: Api.failStatus,
      };
    default:
      return state;
  }
}

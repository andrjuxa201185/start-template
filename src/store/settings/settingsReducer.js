import {actionTypes} from './settingsActions';
import {REQUEST, SUCCESS, FAILURE} from '../../utils/action';
import Api from "../../service/api";

const {
  SET_EDIT_MODE,
  GET_CONTACT_INFO,
  CHECK_CAPTCHA,
} = actionTypes;

const initialState = {
  editMode: false,
  contactInfo: [],
  dataStatus: Api.initialStatus,
};

export default function settings(state = initialState, action) {
  const {type, payload} = action;

  switch (type) {
    case GET_CONTACT_INFO[REQUEST]:
    case CHECK_CAPTCHA[REQUEST]:
      return {
        ...state,
        dataStatus: Api.requestStatus,
      };
    case GET_CONTACT_INFO[SUCCESS]:
      return {
        ...state,
        contactInfo: payload,
        dataStatus: Api.successStatus,
      };
    case SET_EDIT_MODE:
      return {
        ...state,
        editMode: payload,
      };
    case CHECK_CAPTCHA[SUCCESS]:
      return {
        ...state,
        dataStatus: Api.successStatus,
      };
    case GET_CONTACT_INFO[FAILURE]:
    case CHECK_CAPTCHA[FAILURE]:
      return {
        ...state,
        dataStatus: Api.failStatus,
      };
    default:
      return state;
  }
}


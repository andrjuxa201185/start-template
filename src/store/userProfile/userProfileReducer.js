import {actionTypes} from './userProfileActions';
import {actionTypes as authActionTypes} from '../auth/authActions';
import {REQUEST, SUCCESS, FAILURE} from '../../utils/action';
import Api from "../../service/api";

const {
  GET,
  CHANGE_EMAIL,
  CHANGE_PHOTO,
} = actionTypes;

const initialState = {
  data: null,
  dataStatus: Api.initialStatus,
};

export default function userProfile(state = initialState, action) {
  const {type, payload} = action;
  switch (type) {
    case GET[REQUEST]:
    case CHANGE_EMAIL[REQUEST]:
    case CHANGE_PHOTO[REQUEST]:
      return {
        ...state,
        dataStatus: Api.requestStatus,
      };
    case GET[SUCCESS]:
      return {
        ...state,
        data: payload,
        dataStatus: Api.successStatus,
      };
    case CHANGE_EMAIL[SUCCESS]:
      return {
        ...state,
        data: {...state.data, ...payload},
        dataStatus: Api.successStatus,
      };
    case CHANGE_PHOTO[SUCCESS]:
      return {
        data: {
          ...state.data,
          user_profile: {
            ...state.data.user_profile,
            photo: payload,
          },
        },
        dataStatus: Api.successStatus,
      };
    case GET[FAILURE]:
    case CHANGE_EMAIL[FAILURE]:
    case CHANGE_PHOTO[FAILURE]:
      return {
        ...state,
        dataStatus: Api.failStatus,
      };
    case authActionTypes.LOGOUT:
      return {
        ...state,
        ...initialState,
      };
    default:
      return state;
  }
}

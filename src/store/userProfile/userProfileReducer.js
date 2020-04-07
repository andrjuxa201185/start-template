import {actionTypes} from './userProfileActions';
import {actionTypes as authActionTypes} from '../auth/authActions';
import {REQUEST, SUCCESS, FAILURE} from '../../utils/action';
import Api from "../../service/api";

const {
  GET,
  CHANGE_PASSWORD,
  CHANGE_EMAIL,
  CHANGE_PHOTO,
  CHANGE_PHONE,
  CHANGE_PROFILE,
  GET_IS_SET_PW,
} = actionTypes;

const initialState = {
  data: null,
  dataStatus: Api.initialStatus,
};

export default function userProfile(state = initialState, action) {
  const {type, payload} = action;
  switch (type) {
    case GET[REQUEST]:
    case CHANGE_PASSWORD[REQUEST]:
    case CHANGE_EMAIL[REQUEST]:
    case CHANGE_PHOTO[REQUEST]:
    case CHANGE_PHONE[REQUEST]:
    case CHANGE_PROFILE[REQUEST]:
    case GET_IS_SET_PW[REQUEST]:
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
    case CHANGE_PASSWORD[SUCCESS]:
      return {
        ...state,
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
    case CHANGE_PHONE[SUCCESS]:
      return {
        data: {
          ...state.data,
          user_profile: {
            ...state.data.user_profile,
            phone: payload,
          },
        },
        dataStatus: Api.successStatus,
      };
    case CHANGE_PROFILE[SUCCESS]:
      return {
        data: {
          ...state.data,
          user_profile: {
            ...state.data.user_profile,
            ...payload,
          },
        },
        dataStatus: Api.successStatus,
      };
    case GET_IS_SET_PW[SUCCESS]:
      return {
        ...state,
        dataStatus: Api.successStatus,
      };
    case GET[FAILURE]:
    case CHANGE_PASSWORD[FAILURE]:
    case CHANGE_EMAIL[FAILURE]:
    case CHANGE_PHOTO[FAILURE]:
    case CHANGE_PHONE[FAILURE]:
    case CHANGE_PROFILE[FAILURE]:
    case GET_IS_SET_PW[FAILURE]:
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

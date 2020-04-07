import {actionTypes} from './authActions';
import {SUCCESS, REQUEST, FAILURE} from '../../utils/action';
import Auth from '../../service/auth';
import Api from "../../service/api";

const {
  LOGIN,
  FORCE_LOGIN,
  LOGOUT,
  LOGIN_GOOGLE,
  LOGIN_FACEBOOK,
  FORGOT_PASSWORD,
  CHANGE_PASSWORD,
  REGISTRATION,
} = actionTypes;

const initialState = {
  dataStatus: Api.initialStatus,
  tokenLoading: false,
  token: Auth.getTokenFromLocalStorage(),
};

export default function auth(state = initialState, action) {
  const {type, payload} = action;
  switch (type) {
    case LOGIN[REQUEST]:
    case FORCE_LOGIN[REQUEST]:
    case LOGIN_GOOGLE[REQUEST]:
    case LOGIN_FACEBOOK[REQUEST]:
    case FORGOT_PASSWORD[REQUEST]:
    case CHANGE_PASSWORD[REQUEST]:
      return {
        ...state,
        tokenLoading: true,
      };
    case REGISTRATION[REQUEST]:
      return {
        ...state,
        dataStatus: Api.requestStatus,
      };
    case LOGIN_GOOGLE[SUCCESS]:
    case LOGIN_FACEBOOK[SUCCESS]:
    case LOGIN[SUCCESS]:
    case FORCE_LOGIN[SUCCESS]:
      return {
        ...state,
        token: payload,
        tokenLoading: false,
      };
    case REGISTRATION[SUCCESS]:
      return {
        ...state,
        dataStatus: Api.successStatus,
      };
    case FORGOT_PASSWORD[SUCCESS]:
    case CHANGE_PASSWORD[SUCCESS]:
    case CHANGE_PASSWORD[FAILURE]:
    case FORGOT_PASSWORD[FAILURE]:
    case LOGIN[FAILURE]:
    case FORCE_LOGIN[FAILURE]:
    case LOGIN_GOOGLE[FAILURE]:
    case LOGIN_FACEBOOK[FAILURE]:
      return {
        ...state,
        token: null,
        tokenLoading: false,
      };
    case REGISTRATION[FAILURE]:
      return {
        ...state,
        dataStatus: Api.failStatus,
      };
    case LOGOUT: {
      return {
        ...state,
        token: null,
      };
    }

    default:
      return state;
  }
}


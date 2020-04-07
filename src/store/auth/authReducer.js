import {actionTypes} from './authActions';
import {SUCCESS, REQUEST, FAILURE} from '../../utils/action';
import Auth from '../../service/auth';
import Api from "../../service/api";

const {
  LOGIN,
  LOGOUT,
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
      return {
        ...state,
        tokenLoading: true,
      };
    case LOGIN[SUCCESS]:
      return {
        ...state,
        token: payload,
        tokenLoading: false,
      };
    case LOGIN[FAILURE]:
      return {
        ...state,
        token: null,
        tokenLoading: false,
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


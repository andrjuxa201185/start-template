import {actionTypes} from './tributePageActions';
import {REQUEST, SUCCESS, FAILURE} from '../../utils/action';
import Api from "../../service/api";

const {
  GET,
  CREATE,
  UPDATE_GENERAL,
  GET_GENERAL,
  SAVE_PHOTO,
  GET_PHOTO,
  GET_URL,
  SET_URL,
  GET_TAB_HOME,
  SET_TABS_TITLES,
  IS_PUBLISHED,
  UPDATE_SETTING,
  SET_PASSWORD,
  CLEAR_TRIBUTE,
  GET_AUTHOR,
  GET_EDITORS,
  ADD_EDITOR,
  DELETE_EDITOR,
  SET_DESIGN,
  SHARE_SMS,
  SHARE_EMAIL,
} = actionTypes;

const initialState = {
  data: null,
  dataStatus: Api.initialStatus,
};

export default function tributePage(state = initialState, action) {
  const {type, payload} = action;
  switch (type) {
    case GET_TAB_HOME[REQUEST]:
    case GET[REQUEST]:
    case CREATE[REQUEST]:
    case UPDATE_GENERAL[REQUEST]:
    case IS_PUBLISHED[REQUEST]:
    case SAVE_PHOTO[REQUEST]:
    case GET_PHOTO[REQUEST]:
    case GET_URL[REQUEST]:
    case SET_URL[REQUEST]:
    case UPDATE_SETTING[REQUEST]:
    case SET_PASSWORD[REQUEST]:
    case SET_TABS_TITLES[REQUEST]:
    case GET_GENERAL[REQUEST]:
    case GET_AUTHOR[REQUEST]:
    case GET_EDITORS[REQUEST]:
    case ADD_EDITOR[REQUEST]:
    case DELETE_EDITOR[REQUEST]:
    case SET_DESIGN[REQUEST]:
    case SHARE_SMS[REQUEST]:
    case SHARE_EMAIL[REQUEST]:
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
    case CREATE[SUCCESS]:
    case SHARE_SMS[SUCCESS]:
    case SHARE_EMAIL[SUCCESS]:
      return {
        ...state,
        dataStatus: Api.successStatus,
      };
    case IS_PUBLISHED[SUCCESS]:
      return {
        ...state,
        data: {
          ...state.data,
          tribute: {
            ...state.data.tribute,
            is_published: payload,
          },
        },
        dataStatus: Api.successStatus,
      };
    case GET_URL[SUCCESS]:
    case SET_URL[SUCCESS]:
      return {
        ...state,
        data: {
          ...state.data,
          tribute: {
            ...state.data.tribute,
            string_id: payload,
          },
        },
        dataStatus: Api.successStatus,
      };
    case SAVE_PHOTO[SUCCESS]:
    case GET_PHOTO[SUCCESS]:
      return {
        ...state,
        data: {
          ...state.data,
          tribute: {
            ...state.data.tribute,
            photo: payload,
          },
        },
        dataStatus: Api.successStatus,
      };
    case UPDATE_GENERAL[SUCCESS]:
    case GET_GENERAL[SUCCESS]:
    case GET_TAB_HOME[SUCCESS]:
    case UPDATE_SETTING[SUCCESS]:
    case SET_TABS_TITLES[SUCCESS]:
      return {
        ...state,
        data: {
          ...state.data,
          tribute: {
            ...state.data.tribute,
            ...payload,
          },
        },
        dataStatus: Api.successStatus,
      };
    case SET_PASSWORD[SUCCESS]:
      return {
        ...state,
        data: {
          ...state.data,
          tribute: {
            ...state.data.tribute,
            ...payload,
          },
        },
        dataStatus: Api.successStatus,
      };
    case GET_AUTHOR[SUCCESS]:
      return {
        data: {
          ...state.data,
          tribute: {
            ...state.data.tribute,
            author: payload,
          },
        },
        dataStatus: Api.successStatus,
      };
    case GET_EDITORS[SUCCESS]:
    case ADD_EDITOR[SUCCESS]:
      return {
        data: {
          ...state.data,
          tribute: {
            ...state.data.tribute,
            editors: payload,
          },
        },
        dataStatus: Api.successStatus,
      };
    case DELETE_EDITOR[SUCCESS]:
      return {
        data: {
          ...state.data,
          tribute: {
            ...state.data.tribute,
            editors: [...state.data.tribute.editors.filter(({id}) => id !== payload.id)],
          },
        },
        dataStatus: Api.successStatus,
      };
    case CLEAR_TRIBUTE:
      return {
        ...initialState,
      };
    case SET_DESIGN[SUCCESS]:
      return {
        ...state,
        data: {
          ...state.data,
          tribute:{
            ...state.data.tribute,
            design: payload,
          },
        },
        dataStatus: Api.successStatus,
      };
    case GET[FAILURE]:
    case CREATE[FAILURE]:
    case UPDATE_GENERAL[FAILURE]:
    case SAVE_PHOTO[FAILURE]:
    case GET_PHOTO[FAILURE]:
    case GET_URL[FAILURE]:
    case SET_URL[FAILURE]:
    case IS_PUBLISHED[FAILURE]:
    case GET_TAB_HOME[FAILURE]:
    case UPDATE_SETTING[FAILURE]:
    case SET_PASSWORD[FAILURE]:
    case SET_TABS_TITLES[FAILURE]:
    case GET_GENERAL[FAILURE]:
    case GET_AUTHOR[FAILURE]:
    case GET_EDITORS[FAILURE]:
    case DELETE_EDITOR[FAILURE]:
    case ADD_EDITOR[FAILURE]:
    case SET_DESIGN[FAILURE]:
    case SHARE_SMS[FAILURE]:
    case SHARE_EMAIL[FAILURE]:
      return {
        ...state,
        dataStatus: Api.failStatus,
      };
    default:
      return state;
  }
}

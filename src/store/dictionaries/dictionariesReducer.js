import {actionTypes} from './dictionariesActions';
import {REQUEST, SUCCESS, FAILURE} from '../../utils/action';
import Api from "../../service/api";

const {
  GET_BG_POST,
  CLEAR_BG,
} = actionTypes;

const initialState = {
  data: {
    candles: [],
    guestbooks: [],
  },
  dataStatus: Api.initialStatus,
};

export default function dictionaries(state = initialState, action) {
  const {type, payload} = action;
  switch (type) {
    case GET_BG_POST[REQUEST]:
      return {
        ...state,
        dataStatus: Api.requestStatus,
      };
    case CLEAR_BG:
      return {
        ...initialState,
      };
    case GET_BG_POST[SUCCESS]: {
      const {data, field} = payload;
      return {
        ...state,
        data: {
          ...state.data,
          [field]: [...data],
        },
        dataStatus: Api.successStatus,
      };
    }
    case GET_BG_POST[FAILURE]:
      return {
        ...state,
        dataStatus: Api.failStatus,
      };
    default:
      return state;
  }
}

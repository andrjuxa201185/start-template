import {actionTypes} from './myTributePagesActions';
import {REQUEST, SUCCESS, FAILURE} from '../../utils/action';
import Api from "../../service/api";

const {
  GET,
  CLEAR_TRIBUTES,
} = actionTypes;

const initialState = {
  data: [],
  nextPage: null,
  dataStatus: Api.initialStatus,
};

export default function myTributePages(state = initialState, action) {
  const {type, payload} = action;
  switch (type) {
    case GET[REQUEST]:
      return {
        ...state,
        dataStatus: Api.requestStatus,
      };
    case GET[SUCCESS]: {
      const {response, loadMore} = payload;
      const data = loadMore ? [...state.data, ...response.data] : response.data;
      return {
        ...state,
        nextPage: response.next_page_url,
        data,
        dataStatus: Api.successStatus,
      };
    }
    case CLEAR_TRIBUTES:
      return {
        ...initialState,
      };
    case GET[FAILURE]:
      return {
        ...state,
        dataStatus: Api.failStatus,
      };
    default:
      return state;
  }
}

import {actionTypes} from './postsActions';
import {REQUEST, SUCCESS, FAILURE} from '../../utils/action';
import Api from "../../service/api";

const {
  CREATE,
  CLEAR_POSTS,
  EDIT_POST,
  GET_POSTS,
  SWITCH_VISIBLE,
  GET_POST,
  DRAG_POST,
} = actionTypes;

const initialState = {
  data: [],
  nextPage: null,
  post: null,
  dataStatus: Api.initialStatus,
};

export default function posts(state = initialState, action) {
  const {type, payload} = action;
  switch (type) {
    case CREATE[REQUEST]:
    case GET_POSTS[REQUEST]:
    case SWITCH_VISIBLE[REQUEST]:
    case EDIT_POST[REQUEST]:
    case GET_POST[REQUEST]:
    case DRAG_POST[REQUEST]:
      return {
        ...state,
        dataStatus: Api.requestStatus,
      };
    case CLEAR_POSTS:
      return {
        ...initialState,
      };
    case GET_POST[SUCCESS]:
      return {
        ...state,
        data: [
          ...state.data.map(post => {
            if (post.id !== payload.id) {
              return post;
            }
            return payload;
          }),
        ],
        post: payload,
        dataStatus: Api.successStatus,
      };
    case GET_POSTS[SUCCESS]: {
      const {response, loadMore} = payload;
      const data = loadMore ? [...state.data, ...response.data] : response.data;
      return {
        ...state,
        nextPage: response.next_page_url,
        data,
        dataStatus: Api.successStatus,
      };
    }
    case SWITCH_VISIBLE[SUCCESS]:
    case EDIT_POST[SUCCESS]:
      return {
        ...state,
        data: state.data.map(post => {
          if (post.id !== payload.id) {
            return post;
          }
          return payload;
        }),
        dataStatus: Api.successStatus,
      };
    case CREATE[SUCCESS]: {
      return {
        ...state,
        data: [
          payload,
          ...state.data,
        ],
        dataStatus: Api.successStatus,
      };
    }
    case DRAG_POST[SUCCESS]:
      return {
        ...state,
        data: payload,
        dataStatus: Api.successStatus,
      };
    case DRAG_POST[FAILURE]:
      return {
        ...state,
        data: payload,
        dataStatus: Api.failStatus,
      };
    case CREATE[FAILURE]:
    case GET_POSTS[FAILURE]:
    case SWITCH_VISIBLE[FAILURE]:
    case EDIT_POST[FAILURE]:
    case GET_POST[FAILURE]:
      return {
        ...state,
        dataStatus: Api.failStatus,
      };
    default:
      return state;
  }
}

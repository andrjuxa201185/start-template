import action, {
  createRequestActionTypes,
  REQUEST, SUCCESS, FAILURE,
} from '../../utils/action';

export const actionTypes = {
  CLEAR_POSTS: 'CLEAR_POSTS',
  ...createRequestActionTypes('POSTS', {
    CREATE: 'CREATE',
    EDIT_POST: 'EDIT_POST',
    GET_POSTS: 'GET_POSTS',
    GET_POST: 'GET_POST',
    DRAG_POST: 'DRAG_POST',
    SWITCH_VISIBLE: 'SWITCH_VISIBLE',
  }),
};

export const getPosts = {
  request: (data, onSuccess) => action(actionTypes.GET_POSTS[REQUEST], {data, onSuccess}),
  success: payload => action(actionTypes.GET_POSTS[SUCCESS], {payload}),
  failure: () => action(actionTypes.GET_POSTS[FAILURE]),
};

export const getPost = {
  request: data => action(actionTypes.GET_POST[REQUEST], {data}),
  success: payload => action(actionTypes.GET_POST[SUCCESS], {payload}),
  failure: () => action(actionTypes.GET_POST[FAILURE]),
};

export const createPost = {
  request: (data, onSuccess) => action(actionTypes.CREATE[REQUEST], {data, onSuccess}),
  success: payload => action(actionTypes.CREATE[SUCCESS], {payload}),
  failure: () => action(actionTypes.CREATE[FAILURE]),
};

export const editPost = {
  request: (data, onSuccess) => action(actionTypes.EDIT_POST[REQUEST], {data, onSuccess}),
  success: payload => action(actionTypes.EDIT_POST[SUCCESS], {payload}),
  failure: () => action(actionTypes.EDIT_POST[FAILURE]),
};

export const switchVisible = {
  request: (data, onSuccess) => action(actionTypes.SWITCH_VISIBLE[REQUEST], {data, onSuccess}),
  success: payload => action(actionTypes.SWITCH_VISIBLE[SUCCESS], {payload}),
  failure: () => action(actionTypes.SWITCH_VISIBLE[FAILURE]),
};

export const dragPost = {
  request: (data, onSuccess) => action(actionTypes.DRAG_POST[REQUEST], {data, onSuccess}),
  success: payload => action(actionTypes.DRAG_POST[SUCCESS], {payload}),
  failure: payload => action(actionTypes.DRAG_POST[FAILURE], {payload}),
};

export const clearPosts = () => action(actionTypes.CLEAR_POSTS);

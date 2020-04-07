import {actionTypes} from './alertActions';

const initialState = {
  isOpen: false,
  title: '',
  msg: '',
};

export default function alert(state = initialState, action) {
  const {type, payload} = action;

  switch (type) {

    case actionTypes.SHOW_ALERT:
      return {
        ...state,
        isOpen: true,
        title: payload.title,
        msg: payload.msg,
      };

    case actionTypes.HIDE_ALERT:
      return {
        ...initialState,
      };

    default:
      return state;
  }
}


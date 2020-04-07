import action, {
  createRequestActionTypes,
  REQUEST, SUCCESS, FAILURE,
} from '../../utils/action';

export const actionTypes = {
  CLEAR_BG: 'CLEAR_BG',
  ...createRequestActionTypes('DICTIONARIES', {
    GET_BG_POST: 'GET_BG_POST',
  }),
};

export const getBg = {
  request: data => action(actionTypes.GET_BG_POST[REQUEST], {data}),
  success: payload => action(actionTypes.GET_BG_POST[SUCCESS], {payload}),
  failure: () => action(actionTypes.GET_BG_POST[FAILURE]),
};

export const clearBG = () => action(actionTypes.CLEAR_BG);

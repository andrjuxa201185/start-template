import action, {
  createRequestActionTypes,
  REQUEST, SUCCESS, FAILURE,
} from '../../utils/action';

export const actionTypes = {
  CLEAR_TRIBUTES: 'CLEAR_TRIBUTES',
  ...createRequestActionTypes('MY_TRIBUTE_PAGES', {
    GET: 'GET',
  }),
};

export const getMyTributePages = {
  request: data => action(actionTypes.GET[REQUEST], {data}),
  success: payload => action(actionTypes.GET[SUCCESS], {payload}),
  failure: () => action(actionTypes.GET[FAILURE]),
};

export const clearTributes = () => action(actionTypes.CLEAR_TRIBUTES);

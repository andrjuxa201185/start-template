import action, {
  createRequestActionTypes,
  REQUEST, SUCCESS, FAILURE,
} from '../../utils/action';

export const actionTypes = {
  CLEAR_DESIGNS: 'CLEAR_DESIGNS',
  CLEAR_DESIGN: 'CLEAR_DESIGN',
  SET_DESIGN: 'SET_DESIGN',
  ...createRequestActionTypes('DESIGN', {
    GET_DESIGN: 'GET_DESIGN',
    GET_ALL_DESIGN: 'GET_ALL_DESIGN',
  }),
};

export const getDesign = {
  request: data => action(actionTypes.GET_DESIGN[REQUEST], {data}),
  success: payload => action(actionTypes.GET_DESIGN[SUCCESS], {payload}),
  failure: () => action(actionTypes.GET_DESIGN[FAILURE]),
};

export const setDesign = payload => action(actionTypes.SET_DESIGN, {payload});

export const getAllDesign = {
  request: data => action(actionTypes.GET_ALL_DESIGN[REQUEST], {data}),
  success: payload => action(actionTypes.GET_ALL_DESIGN[SUCCESS], {payload}),
  failure: () => action(actionTypes.GET_ALL_DESIGN[FAILURE]),
};

export const clearDesigns = () => action(actionTypes.CLEAR_DESIGNS);
export const clearDesign = () => action(actionTypes.CLEAR_DESIGN);


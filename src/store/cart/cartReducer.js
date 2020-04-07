import {actionTypes} from './cartActions';
import {REQUEST, SUCCESS, FAILURE} from '../../utils/action';
import Api from "../../service/api";

const {
  ADD_TO_CART,
  GET_CART,
  REMOVE_ONE,
  UPDATE_CART,
  CHANGE_AMOUNT,
  REMOVE_PRODUCT,
  CLEAR_CART,
} = actionTypes;

const initialState = {
  data: [],
  dataStatus: Api.initialStatus,
};

export default function cart(state = initialState, action) {
  const {type, payload} = action;
  switch (type) {
    case ADD_TO_CART[REQUEST]:
    case REMOVE_ONE[REQUEST]:
    case CHANGE_AMOUNT[REQUEST]:
    case UPDATE_CART[REQUEST]:
    case CLEAR_CART[REQUEST]:
    case REMOVE_PRODUCT[REQUEST]:
    case GET_CART[REQUEST]:
      return {
        ...state,
        dataStatus: Api.requestStatus,
      };
    case ADD_TO_CART[SUCCESS]:
      return {
        ...state,
        data: [...state.data, payload],
        dataStatus: Api.successStatus,
      };
    case GET_CART[SUCCESS]:
    case REMOVE_PRODUCT[SUCCESS]:
    case CHANGE_AMOUNT[SUCCESS]:
    case UPDATE_CART[SUCCESS]:
    case CLEAR_CART[SUCCESS]:
      return {
        ...state,
        data: payload,
        dataStatus: Api.successStatus,
      };
    case REMOVE_ONE[SUCCESS]:
      return {
        ...state,
        data: state.data.filter(item => item.productId !== payload.productId),
        dataStatus: Api.successStatus,
      };
    case ADD_TO_CART[FAILURE]:
    case GET_CART[FAILURE]:
    case CHANGE_AMOUNT[FAILURE]:
    case UPDATE_CART[FAILURE]:
    case REMOVE_ONE[FAILURE]:
    case CLEAR_CART[FAILURE]:
    case REMOVE_PRODUCT[FAILURE]:
      return {
        ...state,
        dataStatus: Api.failStatus,
      };
    default:
      return state;
  }
}

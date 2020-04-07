import {actionTypes} from './shopActions';
import {FAILURE, REQUEST, SUCCESS} from '../../utils/action';
import Api from "../../service/api";

const {
  GET_GIFTS,
  GET_SHOP_INFO,
  GET_TYPES,
  GET_MAX_PRICE,
  SWITCH_STATUS_GIFT,
  UPDATE_GIFTS_AMOUNT,
  CLEAR_GIFTS,
} = actionTypes;

const initialState = {
  gifts: [],
  shopInfo: [],
  types: [],
  maxPrice: '',
  paramsForGetGifts: null,
  currentPage: null,
  countPage: null,
  prevPage: null,
  nextPage: null,
  total: null,
  dataStatus: Api.initialStatus,
};

export default function shop(state = initialState, action) {
  const {type, payload} = action;
  switch (type) {
    case GET_GIFTS[REQUEST]:
    case GET_SHOP_INFO[REQUEST]:
    case SWITCH_STATUS_GIFT[REQUEST]:
    case UPDATE_GIFTS_AMOUNT[REQUEST]:
    case GET_MAX_PRICE[REQUEST]:
    case GET_TYPES[REQUEST]:
      return {
        ...state,
        dataStatus: Api.requestStatus,
      };
    case GET_GIFTS[SUCCESS]: {
      const {response, loadMore, paramsForGetGifts} = payload;
      const data = loadMore ? [...state.gifts, ...response.data] : response.data;
      return {
        ...state,
        paramsForGetGifts,
        currentPage: response.current_page,
        countPage: response.last_page,
        prevPage: response.prev_page_url,
        nextPage: response.next_page_url,
        total: response.total,
        gifts: data,
        dataStatus: Api.successStatus,
      };
    }
    case GET_SHOP_INFO[SUCCESS]:
      return {
        ...state,
        shopInfo: payload,
        dataStatus: Api.successStatus,
      };
    case GET_TYPES[SUCCESS]:
      return {
        ...state,
        types: payload,
        dataStatus: Api.successStatus,
      };
    case GET_MAX_PRICE[SUCCESS]:
      return {
        ...state,
        maxPrice: payload,
        dataStatus: Api.successStatus,
      };
    case SWITCH_STATUS_GIFT[SUCCESS]: {
      const {field, value, giftId} = payload;
      return {
        ...state,
        gifts: state.gifts.map(gift => {
          if (gift.id !== giftId) {
            return gift;
          }
          return {...gift, [field]: value};
        }),
        dataStatus: Api.successStatus,
      };
    }
    case UPDATE_GIFTS_AMOUNT[SUCCESS]: {
      const {ids, newGifts} = payload;
      return {
        ...state,
        gifts: state.gifts.map(gift => {
          if (ids.includes(gift.id)) {
            const [newGift] = newGifts.filter(item => item.id === gift.id);
            return {
              ...gift,
              name: newGift.name,
              description: newGift.description,
              amount: newGift.amount,
              photo_file: newGift.photo_file,
            };
          }
          return gift;
        }),
        dataStatus: Api.successStatus,
      };
    }
    case CLEAR_GIFTS:
      return initialState;
    case GET_GIFTS[FAILURE]:
    case GET_SHOP_INFO[FAILURE]:
    case GET_MAX_PRICE[FAILURE]:
    case UPDATE_GIFTS_AMOUNT[FAILURE]:
    case SWITCH_STATUS_GIFT[FAILURE]:
    case GET_TYPES[FAILURE]:
      return {
        ...state,
        dataStatus: Api.failStatus,
      };
    default:
      return state;
  }
}

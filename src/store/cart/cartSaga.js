import {put, take} from 'redux-saga/effects';
import {actionTypes} from './cartActions';
import * as actions from './cartActions';
import {REQUEST} from "../../utils/action";
import {LIMIT_TIME_CART} from "../../service/apiConstants";
import {
  tryGetCartFromLocalSrorage,
  trySetCartToLocalStorage,
} from "../../helpers/common";

const {
  ADD_TO_CART,
  GET_CART,
  REMOVE_PRODUCT,
  UPDATE_CART,
  CLEAR_CART,
  REMOVE_ONE,
  CHANGE_AMOUNT,
  CHECK_TIME_CART,
} = actionTypes;

/***************************** Sagas ************************************/

function* addToCartSaga() {
  while (true) {
    const {data: {pageId, img, id, price, name, typeId}} = yield take(ADD_TO_CART[REQUEST]);

    const newProduct = {
      id,
      name,
      price,
      img,
      typeId,
      sortId: id,
      productId: Math.random(),
    };

    // if (typeId === 1) newProduct.id = Math.random();
    if (typeId === 1) newProduct.sortId = Math.random();

    const cart = tryGetCartFromLocalSrorage();
    const allProducts = cart[pageId] ? [...cart[pageId], newProduct] : [newProduct];

    trySetCartToLocalStorage({...cart, [pageId]: allProducts});
    yield put(actions.addToCart.success(newProduct));
  }
}

function* removeOneSaga() {
  while (true) {
    const {data: {pageId, productId}} = yield take(REMOVE_ONE[REQUEST]);
    const cart = tryGetCartFromLocalSrorage();
    const allProducts = cart[pageId]
      ? cart[pageId].filter(item => item.productId !== productId)
      : [];
    trySetCartToLocalStorage({...cart, [pageId]: allProducts});
    yield put(actions.removeOneProduct.success({productId}));
  }
}

function* removeProductSaga() {
  while (true) {
    const {data: {pageId, sortId}} = yield take(REMOVE_PRODUCT[REQUEST]);
    const cart = tryGetCartFromLocalSrorage();

    const allProducts = cart[pageId]
      ? cart[pageId].filter(prod => prod.sortId !== sortId)
      : [];

    trySetCartToLocalStorage({...cart, [pageId]: allProducts});
    yield put(actions.removeProduct.success(allProducts));
  }
}

function* updateCartSaga() {
  while (true) {
    const {data: {pageId, ids, newGifts}} = yield take(UPDATE_CART[REQUEST]);
    const cart = tryGetCartFromLocalSrorage();

    const allProducts = cart[pageId]
      ? cart[pageId].map(gift => {
        if (ids.includes(gift.id)) {
          const [newGift] = newGifts.filter(item => item.id === gift.id);
          return {
            ...gift,
            name: newGift.name,
            price: newGift.amount,
            img: newGift.photo_file,
          };
        }
        return gift;
      })
      : [];

    trySetCartToLocalStorage({...cart, [pageId]: allProducts});
    yield put(actions.removeProduct.success(allProducts));
  }
}

function* clearCartSaga() {
  while (true) {
    const {data: {pageId}} = yield take(CLEAR_CART[REQUEST]);
    const cart = tryGetCartFromLocalSrorage();
    trySetCartToLocalStorage({...cart, [pageId]: []});
    yield put(actions.clearCart.success([]));
  }
}

function* changeAmountSaga() {
  while (true) {
    const {data: {productId, pageId, newAmount}} = yield take(CHANGE_AMOUNT[REQUEST]);
    const cart = tryGetCartFromLocalSrorage();

    const allProducts = cart[pageId]
      ? cart[pageId].map(item => {
        if (item.productId === productId) {
          item.price = newAmount;
          return item;
        }
        return item;
      })
      : [];

    trySetCartToLocalStorage({...cart, [pageId]: allProducts});
    yield put(actions.changeAmount.success(allProducts));
  }
}

function* getCartSaga() {
  while (true) {
    const {data: {pageId}} = yield take(GET_CART[REQUEST]);
    const cart = tryGetCartFromLocalSrorage();
    yield put(actions.getCart.success(cart[pageId] || []));
  }
}

function* checkTimeCartSaga() {
  while (true) {
    yield take(CHECK_TIME_CART);
    let initTime;

    try {
      initTime = localStorage.getItem('initTime');
    } catch (e) {
      console.log(e);
    }

    if (!initTime) {
      try {
        localStorage.setItem('initTime', +new Date());
      } catch (e) {
        console.log(e);
      }
    }

    if (+new Date() - initTime > LIMIT_TIME_CART) {
      try {
        localStorage.removeItem('cart');
        localStorage.removeItem('initTime');
      } catch (e) {
        console.log(e);
      }
    }
  }
}

export default [
  getCartSaga,
  changeAmountSaga,
  addToCartSaga,
  checkTimeCartSaga,
  clearCartSaga,
  removeProductSaga,
  removeOneSaga,
  updateCartSaga,
];

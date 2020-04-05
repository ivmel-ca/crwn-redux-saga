import { all, call } from 'redux-saga/effects';
import { shopSagas } from "./shop/shop.sagas";
import { userSagas } from "./user/user.sagas";
import { cartSagas } from "./cart/cart.sagas";


export default function* rootSaga() {
    // all takes an array of all sagas and executes them in separate task streams
    yield all([
        call(shopSagas),
        call(userSagas),
        call(cartSagas),
    ]);
}
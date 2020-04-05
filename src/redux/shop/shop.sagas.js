import { takeLatest, call, put, all } from 'redux-saga/effects';

import ShopActionTypes from './shop.types';
import {fetchCollectionsSuccess, fetCollectionsFailure} from "./shop.actions";

import {convertCollectionsSnapshotToMap, firestore} from "../../firebase/firebase.util";

export function* fetchCollectionsAsync() {
    try {
        const collectionRef = firestore.collection('collections');
        const snapshot = yield collectionRef.get();
        // call is a func for async call -> first param is func, after first -> its args:
        const collectionsMap = yield call(convertCollectionsSnapshotToMap, snapshot);
        // put func serves as a dispatch -> dispatches the objects with actions
        yield put(fetchCollectionsSuccess(collectionsMap));
    } catch (error) {
        console.error('the error occurred in fetchCollectionAsyncFunction: ', error);
        yield put(fetCollectionsFailure(error.message))
    }
}

export function* fetchCollectionsStart() {
    // takeEvery func is listening to changes but doesn't pause the JS
    yield takeLatest(
        ShopActionTypes.FETCH_COLLECTIONS_START,
        fetchCollectionsAsync
    );
}

export function* shopSagas() {
    yield all([
        call(fetchCollectionsStart)
    ])
}
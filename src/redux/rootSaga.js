import {all} from 'redux-saga/effects'
import productsSaga from './saga/ProductsSaga';
import singleProductSaga from './saga/SingleProductSaga';

export default function* rootSaga() {
    // console.log('root Saga');
    yield all([
        productsSaga(),
        singleProductSaga(),
    ])
}   
import {all} from 'redux-saga/effects'
import productsSaga from './saga/ProductsSaga';
import singleProductSaga from './saga/SingleProductSaga';
import authSaga from './saga/authSaga';
import resetPassSaga from './saga/resetPassSaga';
import adminSaga from './saga/adminSaga';

export default function* rootSaga() {
    // console.log('root Saga');
    yield all([
        productsSaga(),
        singleProductSaga(),
        authSaga(),
        resetPassSaga(),
        adminSaga()
    ])
}   
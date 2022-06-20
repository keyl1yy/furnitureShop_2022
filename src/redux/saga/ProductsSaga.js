import { takeLatest, put } from "redux-saga/effects";
import { getProducts, getProductsFailed, getProductsSuccess } from "../features/productsSlice";
import axios from "axios";

const API_ENDPOINT = 'https://course-api.com/react-store-products?';

function* handleGetProduct(action) {
    // console.log('actionProductSaga: ',action);
    const response = yield axios.get(API_ENDPOINT);
    // console.log(response);
    if(response && response.status === 200) {
        const dataProducts = response.data;
        yield put({
            type: getProductsSuccess.type,
            dataProducts,
        });
    }else{
        yield put({
            type: getProductsFailed.type,
            message: response.msg || 'failed'
        })
    }
}

export default function* productsSaga() {
    console.log('product Saga');
    yield takeLatest(getProducts.type,handleGetProduct)
}
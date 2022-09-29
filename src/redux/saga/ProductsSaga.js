import { takeLatest, put } from "redux-saga/effects";
import { getProducts, getProductsFailed, getProductsSuccess } from "../features/productsSlice";
import axios from "axios";
import { getAllProducts } from "../../services/adminPage/productService";

const API_ENDPOINT = 'https://course-api.com/react-store-products?';

function* handleGetProduct(action) {
    // console.log('actionProductSaga: ',action);
    
    const response = yield getAllProducts("");
    if(response && response.status === 200) {
        const dataProducts = response.data?.products;
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
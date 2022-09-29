import axios from "axios";
import { put, takeLatest } from "redux-saga/effects";
import { getSingleProductAxios } from "../../services/adminPage/productService";
import { getSingleProduct, getSingleProductFailed, getSingleProductSuccess } from "../features/singleProductSlice";

const API_SINGLE_PRODUCT = 'https://course-api.com/react-store-single-product?';

function* handleGetSingleProduct(action){
    // console.log('actionSaga:',action);
    // const url = `${API_SINGLE_PRODUCT}id=${action.payload}`;
    // console.log('url:',url);
    // const response = yield axios.get(url);
    const response = yield getSingleProductAxios(action.payload);
    // console.log('res',response);
    if(response && response.status === 200){
        const dataSingleProduct = response?.data?.product;
        yield put({
            type: getSingleProductSuccess.type,
            dataSingleProduct
        })
    }else{
        yield put({
            type: getSingleProductFailed.type,
            message: response.msg || 'failed'
        })
    }
}

export default function* singleProductSaga() {
    // console.log('single Product Saga');
    yield takeLatest(getSingleProduct.type,handleGetSingleProduct)
}
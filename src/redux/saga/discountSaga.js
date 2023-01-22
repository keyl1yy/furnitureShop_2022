import { put, takeLatest } from "redux-saga/effects";
import { getDiscountDetailAction, getDiscountDetailFail, getDiscountDetailSuccess, sendMailDiscount, sendMailDiscountFail, sendMailDiscountSuccess } from "../features/discountSlice";
import { getDiscountDetail, sendMailDiscountService } from "../../services/discountService";

function* handleSendMailDiscount(action) {
    const response = yield sendMailDiscountService(action.payload);
    if(response && response.status === 200){
        const result = response.data;
        yield put({
            type: sendMailDiscountSuccess.type,
            result
        })
    }else{
        const errMsg = response.response.data;
        yield put({
            type: sendMailDiscountFail.type,
            errMsg
        })
    }
}

function* handleGetDiscountDetail(action) {
    const {discountCode} = action.payload;
    const response = yield getDiscountDetail(discountCode);
    if(response && response.status === 200){
        const result = response.data;
        yield put({
            type: getDiscountDetailSuccess.type,
            result
        })
    }else{
        const errMsg = response.response.data;
        yield put({
            type: getDiscountDetailFail.type,
            errMsg
        })
    }
}

export default function* discountSaga() {
    yield takeLatest(sendMailDiscount.type, handleSendMailDiscount);
    yield takeLatest(getDiscountDetailAction.type, handleGetDiscountDetail);
}
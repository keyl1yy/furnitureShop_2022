import { put, takeLatest } from "redux-saga/effects";
import { postVNPay } from "../../services/vnpayService";
import { checkoutVnPayAction } from "../features/cartSlice";

function* handleCheckOutVnPay(action) {
    console.log("actionSagaHoatla",action.payload);
    const response = yield postVNPay(action.payload);
    console.log("responseVnPay",response);
    if(response &&  response?.status === 200){
        window.open(response?.data?.url)
    }
}

export default function* checkoutVnPaySaga() {
    yield takeLatest(checkoutVnPayAction.type, handleCheckOutVnPay)
}
import { put, takeLatest } from "redux-saga/effects";
import { getAllOrderService, getOrderDetailByIdService, getOrderUserByIdService } from "../../services/orderService/orderService";
import { getAllOrder, getAllOrderFail, getAllOrderSuccess, 
        getOrderByIdUser, getOrderByIdUserFail, getOrderByIdUserSuccess,
        getOrderDetailAction,
        getOrderDetailFail,
        getOrderDetailSuccess} from "../features/orderSlice";

function* handleGetOrderByIdUser(action) {
    const id = action?.payload;

    const response = yield getOrderUserByIdService(id);
    console.log("responseOrder",response);
    if(response && response?.status === 200) {
        const data = response?.data;
        yield put({
            type: getOrderByIdUserSuccess.type,
            data
        })
    }else{
        yield put({
            type: getOrderByIdUserFail.type
        })
    }
}

function* handleGetAllOrder(action) {
    const {payload} = action;
    const response = yield getAllOrderService(payload);
    if(response && response?.status === 200){
        yield put({
            type: getAllOrderSuccess.type,
            data: response?.data
        })
    }else{
        yield put({
            type: getAllOrderFail.type
        })
    }
}

function* handleGetOrderDetail(action) {
    console.log("actionRedux", action);
    const {payload: idOrder} = action;
    const response = yield getOrderDetailByIdService(idOrder);
    if(response && response?.status === 200){
        yield put({
            type: getOrderDetailSuccess.type,
            data: response?.data
        })
    }else{
        yield put({
            type: getOrderDetailFail.type
        })
    }
    console.log("bshjabd",response);
}

export default function* orderSaga() {
    yield takeLatest(getOrderByIdUser.type, handleGetOrderByIdUser);
    yield takeLatest(getAllOrder.type, handleGetAllOrder)
    yield takeLatest(getOrderDetailAction.type, handleGetOrderDetail)
}
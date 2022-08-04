import { put, takeLatest } from "redux-saga/effects";
import { loginAdminFail, loginAdminRedux, loginAdminSuccess, loginAdminWithToken, loginAdminWithTokenFail, loginAdminWithTokenSuccess } from "../features/adminSlice";
import { loginAdmin, loginAdminWithTokenAPI } from "../../services/adminService";


function* handleAdminLogin(action) {
    // console.log('actionSagaAdmin',action);
    const response = yield loginAdmin(action.payload);
    // console.log('res',response);
    if(response && response.status === 200){
        const dataRes = response.data;
        yield put({
            type: loginAdminSuccess.type,
            dataRes
        })
    }else{
        const errMsg = response.response.data;
        yield put({
            type: loginAdminFail.type,
            errMsg
        })
    }

}

function* handleAdminLoginWithToken(action) {
    // console.log('actionSagaAdminToken',action);
    const response = yield loginAdminWithTokenAPI(action.payload);
    console.log('res',response);
    if(response && response.status === 200){
        const dataRes = response.data;
        yield put({
            type: loginAdminWithTokenSuccess.type,
            dataRes
        })  
    }else{
        const errMsg = response.response.data;
        yield put({
            type: loginAdminWithTokenFail.type,
            errMsg
        })
    }
}


export default function* adminSaga(){
    yield takeLatest(loginAdminRedux.type,handleAdminLogin);
    yield takeLatest(loginAdminWithToken.type,handleAdminLoginWithToken)
}
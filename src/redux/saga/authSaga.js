import { put, takeLatest } from 'redux-saga/effects';
import {changePasswordAction, changePasswordFail, changePasswordSuccess, loginUserFail, loginUserRedux, loginUserSuccess,loginUserToken,loginUserWithTokenFail,loginUserWithTokenSuccess, logoutUserFail, logoutUserRedux, logoutUserSuccess, updateUserAction, updateUserFail, updateUserSuccess} from '../features/authSlice';
import {changePasswordUser, loginUser, loginWithToken, logoutUser, updateUserInfo} from '../../services/authService'


function* handleLoginUser(action){
    const response = yield loginUser(action.payload);
    // console.log('response',response);
    if(response && response.status===200){
        const dataRes = response.data
        yield put({
            type: loginUserSuccess.type,
            dataRes,
        })
    }else{
        const errMsg = response.response.data;
        yield put({
            type: loginUserFail.type,
            errMsg
        })
    }

}

function* handleLoginToken(action){
    // console.log('actionToken',action);
    const{payload:token} = action;
    const response = yield loginWithToken(token)
    // console.log('resToken',response);
    if(response && response.status===200){
        const dataRes = response.data
        yield put({
            type: loginUserWithTokenSuccess.type,
            dataRes,
        })
    }else{
        const errMsg = response.response.data;
        yield put({
            type: loginUserWithTokenFail.type,
            errMsg
        })
    }
}

function* handleLogoutUser(action){
    const token = action.payload;
    const response = yield logoutUser(token);
    // console.log('resLogout',response);
    if(response && response.status===200){
        yield put({
            type: logoutUserSuccess.type
        })
    }else{
        yield put({
            type:logoutUserFail.type
        })
    }
}

function* handleUpdateUser(action){
    const {token, values} = action.payload;
    const response = yield updateUserInfo(values, token);
    if(response && response?.status === 200){
        yield put({
            type: updateUserSuccess.type,
            data: response?.data
        })
    }else{
        const errMsg = response.response.data;
        yield put({
            type: updateUserFail.type,
            errMsg
        })
    }
}

function* handleChangePassword(action) {
    const {token, values} = action.payload;
    const response = yield changePasswordUser(values, token);
    console.log("response", response);
    if(response && response?.status === 200){
        yield put({
            type: changePasswordSuccess.type,
            data: response?.data
        })
    }else{
        const errMsg = response.response.data;
        yield put({
            type: changePasswordFail.type,
            errMsg
        })
    }
}

export default function* authSaga(){
    console.log('auth Saga');
    yield takeLatest(loginUserRedux.type,handleLoginUser)
    yield takeLatest(loginUserToken.type,handleLoginToken)
    yield takeLatest(logoutUserRedux.type,handleLogoutUser)
    yield takeLatest(updateUserAction.type, handleUpdateUser)
    yield takeLatest(changePasswordAction.type, handleChangePassword)
}
import { all, put, takeLatest } from 'redux-saga/effects';
import {loginUserFail, loginUserRedux, loginUserSuccess,loginUserToken,loginUserWithTokenFail,loginUserWithTokenSuccess, logoutUserFail, logoutUserRedux, logoutUserSuccess} from '../features/authSlice';
import {loginUser, loginWithToken, logoutUser} from '../../services/userService'


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

export default function* authSaga(){
    console.log('auth Saga');
    yield takeLatest(loginUserRedux.type,handleLoginUser)
    yield takeLatest(loginUserToken.type,handleLoginToken)
    yield takeLatest(logoutUserRedux.type,handleLogoutUser)
}
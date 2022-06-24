import { all, put, takeLatest } from 'redux-saga/effects';
import {loginUserFail, loginUserRedux, loginUserSuccess} from '../features/authSlice';
import {loginUser} from '../../services/userService'


function* handleLoginUser(action){
    const response = yield loginUser(action.payload);
    console.log('response',response);
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


export default function* authSaga(){
    console.log('auth Saga');
    yield takeLatest(loginUserRedux.type,handleLoginUser)
    
}
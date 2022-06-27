import axios from "axios";
import { takeLatest, put } from "redux-saga/effects";
import { sendEmail,resetPassword } from "../../services/userService";
import { sendCheckEmail, sendEmailSuccess, sendEmailFail, resetPasswordRedux } from "../features/resetSlice";

function* handleSendEmail(action) {
    console.log('actionReset',action);
    const {payload:email} = action;
    const response = yield sendEmail({email});
    if(response && response.status === 200){
        const {token} = response.data;
        yield put({
            type:sendEmailSuccess.type,
            token
        })
    }else{
        const errMsg = response.response.data;
        yield put({
            type: sendEmailFail.type,
            errMsg
        })
    }
}



function* handleResetPassword(action) {
    const {payload:password} = action;
    const token = localStorage.getItem('resetPassToken');
    const response = yield resetPassword({password},token);
    console.log('res',response);
    // console.log('actionResetPass',password);
}

export default function* resetPassSaga(){
    console.log('resetPass saga');
    yield takeLatest(sendCheckEmail.type,handleSendEmail);
    yield takeLatest(resetPasswordRedux.type,handleResetPassword)
}
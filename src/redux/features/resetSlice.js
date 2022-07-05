import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoading: false,
    msg:'',
    newPassword: '',
    errCode:0,

}

export const resetPassword = createSlice({
    name: 'resetPassword',
    initialState,
    reducers:{
        sendCheckEmail: (state) => {
            state.isLoading = true;
            state.msg = 'Is Loading';
            state.errCode = 0;
        },
        sendEmailSuccess: (state,action) => {
            // console.log('action',action);
            state.errCode = 10;
            const {token} = action;
            localStorage.setItem('resetPassToken',token)
            state.isLoading = false;
            state.msg = 'Send email successfully!'
        },
        sendEmailFail: (state,action) => {
            // console.log('actionFail',action);
            const {errCode,msg} = action.errMsg;
            state.errCode = errCode;
            state.isLoading = false;
            state.msg = msg;
            const alertFail = document.getElementById('alert-fail');
            // console.log(alertFail);
            
            alertFail.classList.add('show');
            alertFail.classList.add('showAlert');
            alertFail.classList.remove('hide');
            setTimeout(() => {
                alertFail.classList.add('hide');
                alertFail.classList.remove('show');
                
            },5000)
        },
        setDefaultErrCode: (state) => {
            state.errCode = 0;
        },
        resetPasswordRedux: (state) => {
            state.isLoading = true;
            state.msg = 'Resetting password ';
            state.errCode = 0;
        },
        resetPasswordSuccess: (state) => {
            state.isLoading = false;
            state.msg = 'Reset password successful!'
            state.errCode = 10;
            localStorage.removeItem('resetPassToken');
        },
        resetPasswordFail: (state,action) => {
            const {errCode,msg} = action.errMsg;
            state.errCode = errCode;
            state.isLoading = false;
            state.msg = 'Reset password session has expired!';
        }
    }
})

export const {sendCheckEmail,sendEmailFail,sendEmailSuccess,resetPasswordRedux,resetPasswordFail,resetPasswordSuccess,setDefaultErrCode} = resetPassword.actions
export default resetPassword.reducer
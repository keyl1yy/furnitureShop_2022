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
        resetPasswordRedux: (state) => {
            state.isLoading = true;
            state.msg = 'Resetting password '
        },
        resetPasswordSuccess: (state) => {

        },
        resetPasswordFail: (state) => {

        }
    }
})

export const {sendCheckEmail,sendEmailFail,sendEmailSuccess,resetPasswordRedux,resetPasswordFail,resetPasswordSuccess} = resetPassword.actions
export default resetPassword.reducer
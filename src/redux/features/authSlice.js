import { createSlice } from "@reduxjs/toolkit";
import { toastTify } from "../../helper/Toastify";

const initialState = {
    isLoading: false,
    isLoginUser: false,
    phoneNumber: '',
    name:'',
    email:'',
    address: '',
    msg:'',
    errCode:0,// errCode = 10 isLogin = true
    isLoadingPasswordChange: false,
    statusCodeChangePassword: 0
}

export const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers:{
        loginUserRedux: (state) => {
            state.isLoading = true;
            state.msg = 'isLoadingLogin!'
            state.errCode = 0;
            state.isLoginUser = false;
        },
        loginUserToken:(state) => {
            state.isLoading = true;
            state.msg = 'isLoadingLoginToken';
            state.errCode = 0;
            state.isLoginUser = false;
        },
        loginUserSuccess: (state,action) => {
            const alertSuccess = document.getElementById('alert-success');
            state.isLoading = false;
            state.errCode = 10;
            // console.log('actionLoginSuccess',action);
            const {user,accessToken} = action.dataRes;
            state.name = user.name;
            state.phoneNumber = user.phoneNumber;
            state.email = user.email;
            state.address = user.address;
            state.msg = 'LoginSuccessful';
            state.isLoginUser = true;
            delete user.password;
            localStorage.setItem('user',JSON.stringify(user))
            alertSuccess.classList.add('show');
            alertSuccess.classList.add('showAlert');
            alertSuccess.classList.remove('hide');
            localStorage.setItem('accessToken',accessToken);
            setTimeout(() => {
                alertSuccess.classList.add('hide');
                alertSuccess.classList.remove('show');
                
            },3000)
        },
        loginUserWithTokenSuccess: (state,action) => {
            state.isLoading = false;
            state.errCode = 10;
            const {user} = action.dataRes;
            state.name = user.name;
            state.phoneNumber = user.phoneNumber;
            state.email = user.email;
            state.address = user.address;
            state.msg = 'LoginSuccessful';
            state.isLoginUser = true;
            delete user.password
            localStorage.setItem('user',JSON.stringify(user))
        },
        loginUserWithTokenFail: (state,action) => {
            console.log('stateFailToken',action);
            const{errCode,msg} = action.errMsg;
            state.isLoading = false;
            state.errCode = 0;
            state.msg = msg;
            state.isLoginUser = false;
            localStorage.removeItem('accessToken')
            localStorage.removeItem('user')
        }
        ,
        loginUserFail: (state,action) => {
            // console.log('actionLoginFail',action);
            const alertFail = document.getElementById('alert-fail');
            const {errCode,msg} = action.errMsg
            state.isLoading = false;
            state.msg = msg;
            state.errCode = errCode;
            state.isLoginUser = false;
            alertFail.classList.add('show');
            alertFail.classList.add('showAlert');
            alertFail.classList.remove('hide');
            setTimeout(() => {
                alertFail.classList.add('hide');
                alertFail.classList.remove('show');
                
            },3000)
        },
        logoutUserRedux: (state) => {
            state.isLoading = true;
            state.msg='Logout is loading!';
            state.errCode = 0;
            state.isLoginUser = false;
        },
        logoutUserSuccess: (state) => {
            state.isLoading = false;
            state.errCode = 0;
            state.msg = '';
            state.phoneNumber = '';
            state.name = '';
            state.email = '';
            state.address = '';
            state.isLoginUser  = false;
            localStorage.removeItem('accessToken')
            localStorage.removeItem('user')
        },
        logoutUserFail: (state) => {
            state.isLoading = false;
            state.errCode = 1;
            state.isLoginUser = false;
            state.msg = 'Logout Failed!'
        },
        updateUserAction: (state) => {
            state.isLoading = true;
            state.errCode = 0;
            state.msg = ''
        },
        updateUserSuccess: (state, action) => {
            const {data: userData, msg, statusCode} = action?.data
            state.isLoading = false;
            state.msg = msg;
            state.name = userData?.name;
            state.address = userData?.address;
            state.phoneNumber = userData?.phoneNumber;
            state.email = userData?.email;
            toastTify('success',msg)
        },
        updateUserFail: (state, action) =>{ 
            state.isLoading = false;
            state.msg = 'Update Failed!'
            toastTify('error', state.msg)
        },
        changePasswordAction: (state, action) => {
            state.isLoadingPasswordChange = true;
            state.msg = '';
            state.statusCodeChangePassword = 0;
        },
        changePasswordSuccess: (state, action) => {
            const {msg, statusCode} = action?.data
            state.isLoadingPasswordChange = false;
            state.msg = msg;
            state.statusCodeChangePassword  = statusCode;
            toastTify('success', msg);
        },
        changePasswordFail: (state, action) => {
            const {msg, statusCode} = action.errMsg
            state.isLoadingPasswordChange = false;
            state.statusCodeChangePassword  = statusCode;
            state.msg = msg;
            toastTify('error', msg);
        }
       

    }
})

export const {loginUserToken,loginUserRedux,loginUserFail,
            loginUserSuccess,loginUserWithTokenSuccess,
            logoutUserRedux,logoutUserSuccess,logoutUserFail,
            loginUserWithTokenFail, updateUserAction, updateUserSuccess, 
            updateUserFail, changePasswordAction, changePasswordSuccess,
            changePasswordFail} = authSlice.actions;
export default authSlice.reducer
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoading: false,
    phoneNumber: '',
    name:'',
    email:'',
    address: '',
    msg:'',
    errCode:0,// errCode = 10 isLogin = true
}

export const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers:{
        loginUserRedux: (state) => {
            state.isLoading = true;
            state.msg = 'isLoadingLogin!'
            state.errCode = 0;
        },
        loginUserToken:(state) => {
            state.isLoading = true;
            state.msg = 'isLoadingLoginToken';
            state.errCode = 0;
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
        },
        loginUserWithTokenFail: (state,action) => {
            console.log('stateFailToken',action);
            const{errCode,msg} = action.errMsg;
            state.errCode = 0;
            state.msg = msg;
            localStorage.removeItem('accessToken')
        }
        ,
        loginUserFail: (state,action) => {
            // console.log('actionLoginFail',action);
            const alertFail = document.getElementById('alert-fail');
            const {errCode,msg} = action.errMsg
            state.isLoading = false;
            state.msg = msg;
            state.errCode = errCode;
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
        },
        logoutUserSuccess: (state) => {
            state.isLoading = false;
            state.errCode = 0;
            state.msg = '';
            state.phoneNumber = '';
            state.name = '';
            state.email = '';
            state.address = '';
            localStorage.removeItem('accessToken')
        },
        logoutUserFail: (state) => {
            state.isLoading = false;
            state.errCode = 1;
            state.msg = 'Logout Failed!'
        }
       

    }
})

export const {loginUserToken,loginUserRedux,loginUserFail,
            loginUserSuccess,loginUserWithTokenSuccess,
            logoutUserRedux,logoutUserSuccess,logoutUserFail,
            loginUserWithTokenFail} = authSlice.actions;
export default authSlice.reducer
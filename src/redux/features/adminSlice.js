import { createSlice } from "@reduxjs/toolkit";
import {Link, useNavigate, useParams} from 'react-router-dom'

const initialState = {
    isLoading: false,
    name:'',
    email:'',
    address:'',
    phoneNumber:'',
    msg:'',
    errCode:0,
    isLoginAdmin: false,
}


export const adminSlice = createSlice({
    name:'admin',
    initialState,
    reducers:{
        loginAdminRedux: (state) => {
            state.isLoading = true;
            state.msg = 'Login admin is loading!';
            state.errCode = 0;
            state.name = '';
            state.phoneNumber = '';
            state.email = '';
            state.address = '';
            state.isLoginAdmin = false;
        },
        loginAdminSuccess: (state,action) => {
            const {admin,accessToken} = action.dataRes;
            state.isLoading = true;
            state.msg = 'Welcome back';
            state.errCode = 10;
            state.name = admin.name;
            state.phoneNumber = admin.phoneNumber;
            state.address = admin.address;
            state.email = admin.email;
            state.token = accessToken;
            state.isLoginAdmin = true;
            localStorage.setItem('accessTokenAdmin',accessToken);
        },
        loginAdminFail: (state,action) => {
            const alertFail = document.getElementById('alert-fail');
            const{errCode,msg} = action.errMsg;
            state.isLoading = false;
            state.msg = msg;
            state.errCode = errCode;
            state.isLoginAdmin = false;
            alertFail.classList.add('show');
            alertFail.classList.add('showAlert');
            alertFail.classList.remove('hide');
            setTimeout(() => {
                alertFail.classList.add('hide');
                alertFail.classList.remove('show');
                
            },3000)
        },
        loginAdminWithToken: (state) => {
            state.isLoading = true;
            state.msg = 'Admin is loading with token';
            state.errCode = 0;
            state.isLoginAdmin = false;
        },
        loginAdminWithTokenSuccess: (state,action) => {
            console.log('tokenAdminSuccess',action);
            const {dataRes} = action;
            state.name = dataRes.admin.name;
            state.address = dataRes.admin.address;
            state.email = dataRes.admin.email;
            state.phoneNumber = dataRes.admin.phoneNumber;
            state.isLoading = false;
            state.msg = 'Login admin with token successful';
            state.errCode = 10;
            state.isLoginAdmin = true;
        },
        loginAdminWithTokenFail: (state,action) => {
            console.log('tokenAdminTokenFail',action);
            const {errMsg} = action;
            state.isLoading = false;
            state.msg = errMsg.msg || undefined;
            state.errCode = errMsg.errCode;
            state.isLoginAdmin = false;
            // state.msg = 'Login admin with token fail!';
            
        }
    }
})

export const {loginAdminFail,loginAdminRedux,loginAdminSuccess,
                loginAdminWithToken,loginAdminWithTokenFail,loginAdminWithTokenSuccess} = adminSlice.actions;
export default adminSlice.reducer
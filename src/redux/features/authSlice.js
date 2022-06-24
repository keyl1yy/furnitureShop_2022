import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoading: false,
    phoneNumber: '',
    name:'',
    email:'',
    address: '',
    msg:'',
    errCode:0,
}

export const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers:{
        loginUserRedux: (state) => {
            state.isLoading = true;
            state.msg = 'isLoadingLogin!'
        },
        loginUserSuccess: (state,action) => {
            const alertSuccess = document.getElementById('alert-success');
            state.isLoading = false;
            state.errCode = 0;
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
                
            },5000)
        },
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
                
            },5000)
        }
       

    }
})

export const {loginUserRedux,loginUserFail,loginUserSuccess} = authSlice.actions;
export default authSlice.reducer
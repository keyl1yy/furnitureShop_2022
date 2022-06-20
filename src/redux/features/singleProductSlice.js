import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    product: {},
    isLoading: false,
    msg: ''
}

export const singleProduct = createSlice({
    name:'singleProduct',
    initialState,
    reducers:{
        getSingleProduct: (state,action) => {
            state.isLoading = true;
            state.msg = 'isLoading!'
        },
        getSingleProductSuccess: (state,action) => {
            console.log('actionSuccessSingleProduct:',action);
        },
        getSingleProductFailed: (state,action) => {
            console.log('actionFailedSingleProduct:',action);
        }
    }

})

export const {getSingleProduct,getSingleProductFailed,getSingleProductSuccess} = singleProduct.actions
export default singleProduct.reducer
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
            // console.log('actionSuccessSingleProduct:',action);
            state.product = action.dataSingleProduct;
            state.isLoading = false;
            state.msg = 'Successfully!'
        },
        getSingleProductFailed: (state,action) => {
            // console.log('actionFailedSingleProduct:',action);
            state.isLoading = false;
            state.msg = action.message;
        }
    }

})

export const {getSingleProduct,getSingleProductFailed,getSingleProductSuccess} = singleProduct.actions
export default singleProduct.reducer
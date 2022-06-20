import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    products: [],
    dataDefault: [],
    isLoading: false,
    msg:''
}
export const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers:{
        getProducts: (state) => {
            state.isLoading = true;
            state.msg = 'isLoading'
        },
        getProductsSuccess: (state,action) => {
            // console.log('actionSuccess123: ',action.dataProducts);
            state.products = action.dataProducts;
            state.dataDefault = action.dataProducts;
            state.isLoading = false;
            state.msg = 'successfully!'
        },
        getProductsFailed: (state,action) => {
            // console.log('actionFailed: ',action);
            state.isLoading = false;
            state.msg = action.message;
        },
        setProducts: (state,action) => {
            // console.log('actionSetProduct: ',action);
            state.products = action.payload;
        }

    }
})

export const {getProducts,getProductsFailed,getProductsSuccess,setProducts} = productsSlice.actions
export default productsSlice.reducer;
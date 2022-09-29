import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    products: [],
    dataDefault: [],
    isLoading: false,
    characteristics:{},
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
            let arrColors = [];
            let companies = [];
            let categories = [];
            state.products = action.dataProducts;
            state.dataDefault = action.dataProducts;
            state.isLoading = false;
            state.msg = 'successfully!';
            state.dataDefault.forEach((item) => {
                const {category,colors,company} = item;
                // arrColors = [...arrColors,...colors];
                companies = [...companies,company];
                categories = [...categories,category];
            })
            // arrColors = Array.from(new Set(arrColors));
            companies = Array.from(new Set(companies));
            categories = Array.from(new Set(categories));

            state.characteristics = {arrColors,companies,categories}
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
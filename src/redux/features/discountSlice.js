import { createSlice } from "@reduxjs/toolkit";
import { toastTify } from "../../helper/Toastify";

const initialState = {
    isLoading: false,
    discount: {},
    msg: '',
    statusCode: undefined
}

export const discountSlice = createSlice({
    name: 'discounts',
    initialState,
    reducers: {
        sendMailDiscount: (state) => {
            state.isLoading = true;
            state.msg = 'isLoading!';
            state.statusCode = undefined;
        },
        sendMailDiscountSuccess: (state, action) => {
            state.isLoading = false;
            state.msg = 'Done!!!';
            state.statusCode = action.result.statusCode;
        },
        sendMailDiscountFail: (state, action) =>{ 
            state.isLoading = false;
            state.statusCode = action.errMsg.statusCode;
            state.msg = action.errMsg.msg;
        },
        getDiscountDetailAction: (state) => {
            state.isLoading = true;
            state.msg = 'isLoading!';
            state.statusCode = undefined;
            state.discount = {};
        },
        getDiscountDetailSuccess: (state, action) => {
            const {data, msg, statusCode} = action.result;
            state.isLoading = false; 
            state.msg = msg;
            state.statusCode = statusCode;
            state.discount = data;
            localStorage.setItem('discountCode', JSON.stringify(data))
        },
        getDiscountDetailFail: (state, action) => {
            const {msg, statusCode} = action.errMsg;
            state.isLoading = false;
            state.msg = msg;
            state.statusCode = statusCode;
            toastTify('error',msg)
            localStorage.removeItem('discountCode')
        },
        setDiscountDefault: (state) => {
            state.isLoading = false;
            state.msg = '';
            state.statusCode = undefined;
            state.discount = {};
            localStorage.removeItem('discountCode')
        }

    }
})

export const {sendMailDiscount, sendMailDiscountSuccess, sendMailDiscountFail,
            getDiscountDetailAction, getDiscountDetailSuccess, getDiscountDetailFail,
            setDiscountDefault} = discountSlice.actions;
export default discountSlice.reducer;
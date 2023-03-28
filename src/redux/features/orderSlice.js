import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoadingOrderUser: false,
    orderUser: [],

    isLoadingOrder: false,
    orderAllData: [],

    isLoadingOrderDetail: false,
    orderDetail: {},
}

export const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        getOrderByIdUser: (state) => {
            state.isLoadingOrderUser = true;
            state.orderUser = [];
        },
        getOrderByIdUserSuccess: (state, action) => {
            console.log("orderSuccess", state, action);
            state.isLoadingOrderUser = false;
            state.orderUser = action?.data;
        },
        getOrderByIdUserFail: (state, action) => {
            state.isLoadingOrderUser = false;
            state.orderUser = [];
        },
        getAllOrder: (state) => {
            state.isLoadingOrder = true;
            state.orderAllData = [];
        },
        getAllOrderSuccess: (state, action) => {
            console.log("sbhadj",action);
            const {msg, orderList} = action?.data;
            state.isLoadingOrder = false;
            state.orderAllData = orderList;
        },
        getAllOrderFail: (state, action) => {
            state.isLoadingOrder = false;
            state.orderAllData = [];
        },
        getOrderDetailAction: (state) => {
            state.isLoadingOrderDetail = true;
            state.orderDetail = {};
        },
        getOrderDetailSuccess: (state, action) => {
            const {data} = action;
            state.isLoadingOrderDetail = false;
            state.orderDetail = data?.data
        },
        getOrderDetailFail: (state, action) => {
            state.isLoadingOrderDetail = false;
            state.orderDetail = {};
        }
    }
})

export const {getOrderByIdUser, getOrderByIdUserSuccess, getOrderByIdUserFail,
                getAllOrder, getAllOrderSuccess, getAllOrderFail,
                getOrderDetailAction, getOrderDetailSuccess, getOrderDetailFail} = orderSlice.actions;

export default orderSlice.reducer
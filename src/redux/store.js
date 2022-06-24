import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "@redux-saga/core";
import rootSaga from "./rootSaga";
import productsReducer from './features/productsSlice'
import singleProductReducer from './features/singleProductSlice'
import cartReducer from './features/cartSlice'
import authReducer from './features/authSlice'

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
    reducer:{
        products: productsReducer,
        singleProduct: singleProductReducer,
        cartProducts: cartReducer,
        auth: authReducer,
    },
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware().concat(sagaMiddleware)
})

sagaMiddleware.run(rootSaga)
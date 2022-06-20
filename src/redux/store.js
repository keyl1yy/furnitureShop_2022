import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "@redux-saga/core";
import rootSaga from "./rootSaga";
import productsReducer from './features/productsSlice'
import singleProductReducer from './features/singleProductSlice'
const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
    reducer:{
        products: productsReducer,
        singleProduct: singleProductReducer,
    },
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware().concat(sagaMiddleware)
})

sagaMiddleware.run(rootSaga)
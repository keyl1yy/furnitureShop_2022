import { createSlice } from "@reduxjs/toolkit";

const setCartLocalStorage = () => {
    const products = localStorage.getItem('cartProducts');
    return products ? JSON.parse(products) : []
}

const initialState = {
    total:0,
    shippingFee:0,
    amount:0,
    cartProducts: setCartLocalStorage(),
    orderTotal: 0,
    isLoadingVnPay: false
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers:{
        addCart: (state,action) => {
            console.log('actionCart:',action, state.cartProducts);
            const cartProducts = setCartLocalStorage();
            const isProductExisted = cartProducts?.some((el) => (el?.id === action.payload.id && el?.color === action.payload.color));
            if(!isProductExisted){
                state.cartProducts = [...cartProducts, action?.payload];
                localStorage.setItem('cartProducts',JSON.stringify(state.cartProducts));
            }
            else{
                const arrCart = cartProducts.map((el) => {
                    if(el?.color === action?.payload?.color && el?.id === action?.payload?.id){
                        return{
                            ...el,
                            amountCart: el?.amountCart + action?.payload?.amountCart
                        }
                    }
                    return{
                        ...el
                    }
                })
                state.cartProducts = [...arrCart];

                localStorage.setItem('cartProducts',JSON.stringify(arrCart));
            }
        },
        toggleAmountCartItem: (state,action) => {
            console.log('actionToggleCartItem:',action);
            const {id, msg, color} = action.payload;
            state.cartProducts = state.cartProducts.map((cartItem) => {
                if(cartItem.id === id && cartItem.color === color){
                    if(msg === 'inc'){
                        return {...cartItem,amountCart: cartItem.amountCart+1}
                    }
                    if(msg === 'dec'){
                        return {...cartItem,amountCart: cartItem.amountCart-1}
                    }
                }
                return cartItem
            })
            localStorage.setItem('cartProducts',JSON.stringify(state.cartProducts));
        },
        removeCartItem: (state,action) => {
            console.log('removeCartItem:',action);
            const {id, color} = action.payload;
            state.cartProducts = state.cartProducts.filter((item) => {
                return (item.id!== id) || (item.color !== color)
            })
            localStorage.setItem('cartProducts',JSON.stringify(state.cartProducts));

        },
        clearCart: (state) => {
            console.log('clearCart');
            state.cartProducts = []
            localStorage.setItem('cartProducts',JSON.stringify(state.cartProducts));

        },
        getAmount: (state) => {
            let amount = state.cartProducts.reduce((prev,cur) => {
                return prev + cur.amountCart
            },0)
            state.amount = amount;

        },
        getTotal: (state) => {
            state.total = state.cartProducts.reduce((prev,cur) => {
                return prev + (cur.price*cur.amountCart)
            },0)
        },
        getShippingFee: (state) => {
            let isShipFee = state.cartProducts.every((item) => item.shipping === true);
            if(isShipFee || state.total > 50000){
                // console.log("isShip1",isShipFee);
                state.shippingFee = 0;
            }else{
                state.shippingFee = 6;
                // console.log("isShip2",isShipFee);
            }
        },
        getOrderTotal: (state) => {
            state.orderTotal = state.total + state.shippingFee;
        },
        checkoutVnPayAction: (state) => {
            state.isLoadingVnPay = true;
        },
        checkoutVnPaySuccess: (state, action) => {
            console.log("actionSagaSuccess",action);
            state.isLoadingVnPay = false;
        },
        checkoutVnPayFail: (state, action) =>{ 
            console.log("actionSagaFail",action);
            state.isLoadingVnPay = false;
        }
    }
})

export const {addCart,toggleAmountCartItem,removeCartItem,clearCart,getAmount,getTotal,getShippingFee,getOrderTotal,
                checkoutVnPayAction, checkoutVnPaySuccess, checkoutVnPayFail  } = cartSlice.actions;
export default cartSlice.reducer;
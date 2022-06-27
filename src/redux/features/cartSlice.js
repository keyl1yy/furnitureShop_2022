import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    total:0,
    shippingFee:0,
    amount:0,
    cartProducts:[],
    orderTotal: 0
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers:{
        addCart: (state,action) => {
            // console.log('actionCart:',action);
            state.cartProducts = [...state.cartProducts,action.payload];
        },
        toggleAmountCartItem: (state,action) => {
            // console.log('actionToggleCartItem:',action);
            const {id, msg} = action.payload;
            state.cartProducts = state.cartProducts.map((cartItem) => {
                if(cartItem.id === id){
                    if(msg === 'inc'){
                        return {...cartItem,amountCart: cartItem.amountCart+1}
                    }
                    if(msg === 'dec'){
                        return {...cartItem,amountCart: cartItem.amountCart-1}
                    }
                }
                return cartItem
            })

        },
        removeCartItem: (state,action) => {
            // console.log('removeCartItem:',action);
            state.cartProducts = state.cartProducts.filter((item) => item.id!==action.payload)
        },
        clearCart: (state) => {
            // console.log('clear cart');
            state.cartProducts = []
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
        }
    }
})

export const {addCart,toggleAmountCartItem,removeCartItem,clearCart,getAmount,getTotal,getShippingFee,getOrderTotal} = cartSlice.actions;
export default cartSlice.reducer;
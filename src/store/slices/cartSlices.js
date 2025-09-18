import { createSlice } from "@reduxjs/toolkit";


const cartSlice = createSlice({
    name: "cart",
    initialState: {
        cartItems: [],
        total: 0
    },
    reducers: {
        addItemTocart: (state, action) => {
            const {product, available} = action.payload
            const productInCart = state.cartItems.find(item=>item.id===product.id)
            if(!productInCart){
                state.cartItems.push({...product, available})
            }else{
                productInCart.available+=1
            }
            state.total = state.cartItems.reduce((acc,item)=> acc + item.price*item.available, 0)
        },
        removeItemFromCart: (state, action) => {
      const itemId = action.payload;
      state.cartItems = state.cartItems.filter(item => item.id !== itemId);
      state.total = state.cartItems.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      );
    },
  },
    })

export const { addItemTocart, removeItemFromCart } = cartSlice.actions

export default cartSlice.reducer
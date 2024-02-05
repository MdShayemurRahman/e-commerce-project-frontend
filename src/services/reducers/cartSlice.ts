import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import CartItem from '../../types/CartItem';
import Product from '../../types/Product';

const initialState: CartItem[] = [];

export const cartSlice = createSlice({
  name: 'cartSlice',
  initialState,
  reducers: {
    addProductToCart: (state, action: PayloadAction<Product>) => {
      const cartItem: CartItem = { ...action.payload, quantity: 1 };
      const foundIndex = state.findIndex(
        (item) => item._id === action.payload._id
      );
      if (foundIndex !== -1) {
        state[foundIndex].quantity++;
      } else {
        state.push(cartItem);
      }
    },
    updateCartItemQuantity: (
      state,
      action: PayloadAction<{ _id: string; quantity: number }>
    ) => {
      const foundIndex = state.findIndex(
        (item) => item._id === action.payload._id
      );
      if (foundIndex !== -1) {
        state[foundIndex].quantity = action.payload.quantity;
      }
    },
    removeProductFromCart: (state, action: PayloadAction<{ id: string }>) => {
      const productIdToRemove = action.payload.id;
      return state.filter((item) => item._id !== productIdToRemove);
    },
    emptyCart: (state) => {
      return initialState;
    },
  },
});

const cartReducer = cartSlice.reducer;
export const {
  addProductToCart,
  updateCartItemQuantity,
  removeProductFromCart,
  emptyCart,
} = cartSlice.actions;
export default cartReducer;

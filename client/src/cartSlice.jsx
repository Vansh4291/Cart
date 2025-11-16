import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],
    cart: []
  },
  reducers: {
    setProducts(state, action) {
      state.products = action.payload;
    },

    addToCart(state, action) {
      const existing = state.cart.find(i => i._id === action.payload._id);
      if (existing) {
        existing.qty += 1;
      } else {
        state.cart.push({ ...action.payload, qty: 1 });
      }
    },

    adjustQty(state, action) {
      const { id, newQty } = action.payload;
      if (newQty <= 0) {
        state.cart = state.cart.filter(i => i._id !== id);
        return;
      }

      state.cart = state.cart.map(i =>
        i._id === id ? { ...i, qty: newQty } : i
      );
    },

    removeFromCart(state, action) {
      state.cart = state.cart.filter(i => i._id !== action.payload);
    },

    clearCart(state) {
      state.cart = [];
    }
  }
});

export const {
  setProducts,
  addToCart,
  adjustQty,
  removeFromCart,
  clearCart
} = cartSlice.actions;

export default cartSlice.reducer;

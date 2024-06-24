import { createSlice, createSelector } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [], // Initialize items as an array in the state
  },
  reducers: {
    addItem: (state, action) => {
      state.items.push(action.payload); // Modify items directly in the state
    },
    removeItem: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload); // Remove item from items array
    },
  },
});

export const { addItem, removeItem } = cartSlice.actions; // Export actions

export const getSelector = createSelector(
  (state) => state.cart.items, // Selector to retrieve items from state
  (items) => items
);

export default cartSlice.reducer; // Export reducer

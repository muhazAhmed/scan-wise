import { createSlice, createSelector } from "@reduxjs/toolkit";

const cardSlice = createSlice({
  name: "Cart",
  initialState: [],
  reducers: {
    addItem: (state, action) => {
      state.push(action.payload);
    },
  },
});

export const getSelector = createSelector(
    (state) => state.cart,
    (state) => state
)

export const {addItem} = cardSlice.actions
export default cardSlice.reducer;
import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "product",
  initialState: {
    addProduct: {
      isFetching: false,
      currentProduct: null,
      error: false,
      success: false,
    },
  },
  reducers: {
    addProductStart: (state) => {
        state.addProduct.isFetching = true;
    },
    addProductSuccess: (state,action) => {
        state.addProduct.isFetching = false;
        state.addProduct.error = false;
        state.addProduct.success = true;
        state.addProduct.currentProduct = action.payload;
    },
    addProductFailed: (state) => {
        state.addProduct.isFetching = false;
        state.addProduct.error = true;
        state.addProduct.success = false;
    }
  },
});

export const {
    addProductStart,
    addProductSuccess,
    addProductFailed
} = productSlice.actions;

export default productSlice.reducer;
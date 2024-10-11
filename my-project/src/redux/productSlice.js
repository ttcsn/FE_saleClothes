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
    getAllProduct: {
      isFetching: false,
      currentAllProduct: null,
      error: false,
      success: false,
    },
  },
  reducers: {
    addProductStart: (state) => {
      state.addProduct.isFetching = true;
    },
    addProductSuccess: (state, action) => {
      state.addProduct.isFetching = false;
      state.addProduct.error = false;
      state.addProduct.success = true;
      state.addProduct.currentProduct = action.payload;
    },
    addProductFailed: (state) => {
      state.addProduct.isFetching = false;
      state.addProduct.error = true;
      state.addProduct.success = false;
    },
    getAllProductStart: (state) => {
      state.getAllProduct.isFetching = true;
    },
    getAllProductSuccess: (state, action) => {
      state.getAllProduct.isFetching = false;
      state.getAllProduct.error = false;
      state.getAllProduct.success = true;
      state.getAllProduct.currentAllProduct = action.payload;
    },
    getAllProductFailed: (state) => {
      state.getAllProduct.isFetching = false;
      state.getAllProduct.error = true;
      state.getAllProduct.success = false;
    },
  },
});

export const { addProductStart, addProductSuccess, addProductFailed, getAllProductStart,getAllProductFailed,getAllProductSuccess } =
  productSlice.actions;

export default productSlice.reducer;

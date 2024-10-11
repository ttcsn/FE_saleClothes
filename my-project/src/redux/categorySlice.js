import { createSlice } from "@reduxjs/toolkit";

const categorySlice = createSlice({
  name: "category",
  initialState: {
    getCategory: {
      isFetching: false,
      currentCategory: null,
      error: false,
      success: false,
    },
    getSubCategory: {
      isFetching: false,
      currentSubCategory: null,
      error: false,
      success: false,
    },
    getAllSubCategory: {
      isFetching: false,
      currentAllSubCategory: null,
      error: false,
      success: false,
    },
  },
  reducers: {
    getCategoryStart: (state) => {
      state.getCategory.isFetching = true;
    },
    getCategorySuccess: (state, action) => {
      state.getCategory.isFetching = false;
      state.getCategory.error = false;
      state.getCategory.success = true;
      state.getCategory.currentCategory = action.payload;
    },
    getCategoryFailed: (state) => {
      state.getCategory.isFetching = false;
      state.getCategory.error = true;
      state.getCategory.success = false;
    },
    getSubCategoryStart: (state) => {
      state.getSubCategory.isFetching = true;
    },
    getSubCategorySuccess: (state, action) => {
      state.getSubCategory.isFetching = false;
      state.getSubCategory.error = false;
      state.getSubCategory.success = true;
      state.getSubCategory.currentSubCategory = action.payload;
    },
    getSubCategoryFailed: (state) => {
      state.getSubCategory.isFetching = false;
      state.getSubCategory.error = true;
      state.getSubCategory.success = false;
    },
    getAllSubCategoryStart: (state) => {
      state.getAllSubCategory.isFetching = true;
    },
    getAllSubCategorySuccess: (state, action) => {
      state.getAllSubCategory.isFetching = false;
      state.getAllSubCategory.error = false;
      state.getAllSubCategory.success = true;
      state.getAllSubCategory.currentAllSubCategory = action.payload;
    },
    getAllSubCategoryFailed: (state) => {
      state.getAllSubCategory.isFetching = false;
      state.getAllSubCategory.error = true;
      state.getAllSubCategory.success = false;
    },
  },
});


export const {
    getCategoryStart,
    getCategoryFailed,
    getCategorySuccess,
    getSubCategoryStart,
    getSubCategorySuccess,
    getSubCategoryFailed,
    getAllSubCategoryStart,
    getAllSubCategorySuccess,
    getAllSubCategoryFailed
} = categorySlice.actions

export default categorySlice.reducer;
import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    login: {
      currentUser: null,
      isFetching: false,
      error: false,
      usernameError:"",
      passwordError:"",
    },
    register: {
      isFetching: false,
      error: false,
      success: false,
      usernameError: "",  // Thông báo lỗi cho username
      emailError: "",     // Thông báo lỗi cho email
    },
    logout: {
      isFetching: false,
      error: false,
      success: false,
    },
  },
  reducers: {
    loginStart: (state) => {
      state.login.isFetching = true;
    },
    loginSuccess: (state, action) => {
      state.login.isFetching = false;
      state.login.currentUser = action.payload;
      state.login.error = false;
    },
    loginFailed: (state,action) => {
      state.login.isFetching = false;
      state.login.error = true;
      state.login.usernameError = action.payload.usernameError || "";
      state.login.passwordError = action.payload.passwordError || "";
    },
    registerStart: (state) => {
      state.register.isFetching = true;
    },
    registerSuccess: (state) => {
      state.register.isFetching = false;
      state.register.success = true;
      state.register.error = false;
    },
    registerFailed: (state,action) => {
      state.register.isFetching = false;
      state.register.error = true;
      state.register.success = false;
      state.register.usernameError = action.payload.usernameError || "";  // Lưu thông báo lỗi cho username
      state.register.emailError = action.payload.emailError || ""; 
    },
    logoutStart: (state) => {
      state.register.isFetching = true;
    },
    logoutSuccess: (state) => {
      state.register.isFetching = false;
      state.register.success = true;
      state.register.error = false;
    },
    logoutFailed: (state) => {
      state.register.isFetching = false;
      state.register.error = true;
      state.register.success = false;
    },
  
  },
});
export const {
  loginStart,
  loginFailed,
  loginSuccess,
  registerStart,
  registerFailed,
  registerSuccess,
  logoutStart,
  logoutSuccess,
  logoutFailed,
} = authSlice.actions;

export default authSlice.reducer;

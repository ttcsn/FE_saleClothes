import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    users: {
      allUsers: null,
      isFetching: false,
      error: false,
    },
    user: {
        user: null,
        isFetching: false,
        error: false
    },
    msg:"",
  },
  reducers: {
    // get all user
    getUsersStart: (state) => {
      state.users.isFetching = true;
    },
    getUsersSuccess: (state, action) => {
      state.users.isFetching = false;
      state.users.allUsers = action.payload;
    },
    getUsersFailed: (state) => {
      state.users.isFetching = false;
      state.users.error = true;
    },
    //get user
    getUserStart: (state) => {
        state.users.isFetching = true;
    },
    getUserSuccess: (state, action) => {
        state.user.isFetching = false;
        state.user.user = action.payload;
    },
    getUserFailed: (state) => {
        state.user.isFetching = false;
        state.user.error = true;
    },
    deleteUserStart: (state) => {
      state.user.isFetching = true;
    },
    deleteUserSuccess: (state,action) => {
      state.user.isFetching = false;
      state.msg = action.payload;
    },
    deleteUserFailed: (state,action) => {
      state.user.isFetching = false;
      state.user.error = true;
      state.msg = action.payload
    }

  },
});
export const { getUsersStart, getUsersSuccess, getUsersFailed, getUserStart,getUserSuccess,getUserFailed,deleteUserStart,deleteUserSuccess,deleteUserFailed } =
  userSlice.actions;

export default userSlice.reducer;

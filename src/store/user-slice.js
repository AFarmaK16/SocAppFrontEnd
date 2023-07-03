import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: [],
  filteredUsers: [],
  userDetails: null,
  totalUsers: 0,

};

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    replaceUsers: (state, action) => {
      state.users = action.payload;
      state.filteredUsers = action.payload;
      state.totalUsers = action.payload.length;
      // console.log(state.users);
    },
    setUsersDetails: (state, action) => {
      state.userDetails = action.payload;
      console.log(state.userDetails);
    },
  
  },
});

export const usersActions = userSlice.actions;

export default userSlice;

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {
    id: null,
    username: "",
    email: "",
    password: "",
  },
  login: false,
};

const authReducer = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.user = action.payload;
      state.login = true;
      localStorage.setItem("token", action.payload.token);
    },
    logoutSuccess: (state) => {
      state.user = initialState.user;
      state.login = false;
      localStorage.removeItem("token");
    },
  },
});

export const { loginSuccess, logoutSuccess } = authReducer.actions;

export default authReducer.reducer;

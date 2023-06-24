import { combineReducers, createSlice } from "@reduxjs/toolkit";
import axios from "axios";



const initialState = {
  user: {
    id: null,
    username: "",
    email: "",
    phoneNumber: "",
    profilePicture: "",
    isVerified: false,
    role: false,
  },
  login: false,
};

export const AuthReducer = createSlice({
  name: "AuthReducer",
  initialState,
  reducers: {
    setUser: (state, action) => {
      const {
        id,
        username,
        email,
        phoneNumber,
        profilePicture,
        isVerified,
        role,
      } = action.payload;
      state.user = {
        id,
        username,
        email,
        phoneNumber,
        profilePicture,
        isVerified,
        role,
      };
    },



    loginSuccess: (state, action) => {
      state.login = false;
      localStorage.removeItem("token");
    },
    keepLoginSuccess: (state, action) => {
      state.login = true;
    },
  },
});

export const { setUser, loginSuccess, keepLoginSuccess } = AuthReducer.actions;

export const login = (data) => {
  return async (dispatch) => {
    const { username, email, phoneNumber, password } = data;
    const res = await axios.post(
      "https://minpro-blog.purwadhikabootcamp.com/api/auth/login",
      {
        username: username,
        email: email,
        phoneNumber: phoneNumber,
        password: password,
      }
    );
    const token = res.data.token;
    localStorage.setItem("token", token);
    dispatch(loginSuccess());
    dispatch(setUser(res.data.IsAccountExist));
  };
};
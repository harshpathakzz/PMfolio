import { createSlice } from "@reduxjs/toolkit";

const storedState = JSON.parse(localStorage.getItem("auth")) || {
  isLoggedIn: false,
  user: null,
  accessToken: null,
};

const initialState = {
  ...storedState,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.isLoggedIn = true;
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
      // Save the updated state to localStorage
      localStorage.setItem("auth", JSON.stringify(state));
    },

    logout: (state) => {
      state.isLoggedIn = false;
      state.user = null;
      state.accessToken = null;
      // Clear the state from localStorage
      localStorage.removeItem("auth");
    },
  },
});

// Export the action creators
export const { login, logout } = authSlice.actions;

// Export the reducer
export default authSlice.reducer;

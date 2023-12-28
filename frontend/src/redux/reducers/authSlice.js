import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: {
      id: null,
      firstName: null,
      lastName: null,
      email: null,
      userName: null,
      rememberMe: false,
    },
    token: null,
    isAuthenticated: false,
  },
  reducers: {
    setIsAuthenticated: (state, action) => {
      state.isAuthenticated = action.payload;
    },
    setCredentials: (state, action) => {
      state.user = action.payload.user; 
      state.token = action.payload.token;
      state.isAuthenticated = true;
      state.user.rememberMe = action.payload.rememberMe;
    },
    logout: (state) => {
      state.user = {}; 
      state.token = null;
      state.isAuthenticated = false;
    },
    updateUserProfile: (state, action) => {
      state.user.userName = action.payload.userName;
    },
    checkRememberMe: (state) => {
      const localStorageToken = localStorage.getItem('token');
      const sessionStorageToken = sessionStorage.getItem('sessionToken');

      if (localStorageToken || sessionStorageToken) {
        state.token = localStorageToken || sessionStorageToken;
        state.isAuthenticated = true;
      }
    },
  },
});

export const { setIsAuthenticated, setCredentials, logout, updateUserProfile, checkRememberMe } = authSlice.actions;

export default authSlice.reducer;

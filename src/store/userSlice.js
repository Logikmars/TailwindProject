import { createSlice } from '@reduxjs/toolkit';
import { loginUser, registerUser, resetPassword, refreshToken } from './userThunks';

const initialState = {
  email: null,
  token: null,
  isAuth: false,
  loading: false,
  error: null,
  balance: 0,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout(state) {
      state.email = null;
      state.token = null;
      state.isAuth = false;
      state.balance = 0;
      localStorage.removeItem('accessToken');
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuth = true;
        state.email = action.payload.user.email;
        state.token = action.payload.accessToken;
      })
      .addCase(loginUser.rejected, (state, action) => { state.loading = false; state.error = action.payload; })
      
      // register
      .addCase(registerUser.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuth = true;
        state.email = action.payload.user.email;
        state.token = action.payload.accessToken;
      })
      .addCase(registerUser.rejected, (state, action) => { state.loading = false; state.error = action.payload; })
      
      // reset password
      .addCase(resetPassword.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(resetPassword.fulfilled, (state) => { state.loading = false; })
      .addCase(resetPassword.rejected, (state, action) => { state.loading = false; state.error = action.payload; })
      
      // refresh token
      .addCase(refreshToken.fulfilled, (state, action) => {
        state.token = action.payload.accessToken;
        state.email = action.payload.user.email;
        state.isAuth = true;
      });
  },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;

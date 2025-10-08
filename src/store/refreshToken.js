import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../api/axiosInstance';
import { setUser, logout } from './userSlice';

export const refreshToken = createAsyncThunk('user/refreshToken', async (_, { dispatch, rejectWithValue }) => {
  try {
    const res = await api.get('/user/refresh');
    const { user, accessToken } = res.data;
    localStorage.setItem('accessToken', accessToken);
    dispatch(setUser({ ...user, token: accessToken }));
    return { user, accessToken };
  } catch (err) {
    dispatch(logout());
    return rejectWithValue(err.response?.data?.message || 'Cannot refresh token');
  }
});

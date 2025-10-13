import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api/axiosInstance";

// логин
export const loginUser = createAsyncThunk(
  "user/loginUser",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await api.post("/user/login", { email, password });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Ошибка входа");
    }
  }
);

// регистрация
export const registerUser = createAsyncThunk(
  "user/registerUser",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await api.post("/user/register", { email, password });
      return response.data;
    } catch (error) {
        console.log(error.response?.data)
      return rejectWithValue(error.response?.data?.message || "Ошибка регистрации");
    }
  }
);

// восстановление пароля
export const resetPassword = createAsyncThunk(
  "user/resetPassword",
  async ({ email }, { rejectWithValue }) => {
    try {
      const res = await api.post("/user/resetPassword", { email });
      return res.data.message;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Ошибка при сбросе пароля");
    }
  }
);

export const refreshToken = createAsyncThunk(
  'user/refreshToken',
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get('/user/refresh'); // куки отправляются автоматически
      return res.data; // { user, accessToken }
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Ошибка обновления токена');
    }
  }
);

export const logoutUser = createAsyncThunk('user/logout', async (_, thunkAPI) => {
  try {
    await api.post('/user/logout');
    return true;
  } catch (err) {
    console.error('Ошибка при logout:', err);
    return thunkAPI.rejectWithValue(err.response?.data || 'Ошибка');
  }
});
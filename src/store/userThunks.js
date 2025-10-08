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

// src/store/transactionsSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../api/axiosInstance'; // 👈 создадим ниже

// Асинхронный thunk для отправки транзакции на сервер
export const sendTransaction = createAsyncThunk(
  'transactions/sendTransaction',
  async (transactionData, { rejectWithValue }) => {
    try {
      const response = await api.post('/transaction/newTransaction', transactionData);
      return response.data; // возвращаем ответ с бэка
    } catch (err) {
      return rejectWithValue(err.response?.data || 'Server error');
    }
  }
);

const transactionsSlice = createSlice({
  name: 'transactions',
  initialState: {
    list: [],
    loading: false,
    error: null,
  },
  reducers: {
    addTransactionLocal: (state, action) => {
      state.list.push({
        id: Date.now(),
        ...action.payload,
      });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendTransaction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(sendTransaction.fulfilled, (state, action) => {
        state.loading = false;
        state.list.push(action.payload); // добавляем то, что пришло с бэка
      })
      .addCase(sendTransaction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { addTransactionLocal } = transactionsSlice.actions;
export default transactionsSlice.reducer;

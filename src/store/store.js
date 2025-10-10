import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import modalReducer from './modalSlice';
import transactionsReducer from './transactionsSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    modal: modalReducer,
    transactions: transactionsReducer,
  },
});

export default store;

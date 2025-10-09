import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  type: null,
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal(state, action) {
      state.type = action.payload;
    },
    closeModal(state) {
      state.type = null;
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;

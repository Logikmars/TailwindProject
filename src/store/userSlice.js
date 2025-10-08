import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: null,
  email: null,
  isAuth: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action) {
      const { name, email } = action.payload;
      state.name = name;
      state.email = email;
      state.isAuth = true;
    },
    logout(state) {
      state.name = null;
      state.email = null;
      state.isAuth = false;
    },
  },
});

export const { setUser, logout } = userSlice.actions;
export default userSlice.reducer;

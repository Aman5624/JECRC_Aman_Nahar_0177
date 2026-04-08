import { createSlice } from '@reduxjs/toolkit';
import { deleteEmployeeAsync, saveEmployeeAsync } from '../employees/employeesSlice';
import { loginUserAsync } from '../auth/authSlice';

const initialState = {
  theme: 'light',
  isLoading: false,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleTheme(state) {
      state.theme = state.theme === 'light' ? 'dark' : 'light';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(saveEmployeeAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(saveEmployeeAsync.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(saveEmployeeAsync.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(deleteEmployeeAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteEmployeeAsync.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(deleteEmployeeAsync.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(loginUserAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUserAsync.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(loginUserAsync.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const { toggleTheme } = uiSlice.actions;

export default uiSlice.reducer;

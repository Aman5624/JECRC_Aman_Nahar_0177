import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const wait = (ms) => new Promise((resolve) => {
  setTimeout(resolve, ms);
});

const initialState = {
  isAuthenticated: false,
  currentUser: null,
  error: null,
};

export const loginUserAsync = createAsyncThunk(
  'auth/loginUserAsync',
  async ({ username, password }, { rejectWithValue }) => {
    await wait(500);

    if (!username || !password) {
      return rejectWithValue('Username and password are required.');
    }

    return {
      id: 'admin-1',
      username,
      role: 'Administrator',
    };
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logoutUser(state) {
      state.isAuthenticated = false;
      state.currentUser = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUserAsync.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.currentUser = action.payload;
        state.error = null;
      })
      .addCase(loginUserAsync.rejected, (state, action) => {
        state.isAuthenticated = false;
        state.currentUser = null;
        state.error = action.payload || 'Login failed. Please try again.';
      });
  },
});

export const { logoutUser } = authSlice.actions;

export default authSlice.reducer;

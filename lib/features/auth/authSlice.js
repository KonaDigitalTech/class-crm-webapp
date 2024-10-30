import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  userInfo: null,
  token: null,
  status: 'idle',
  error: null,
};

export const authLogin = createAsyncThunk('auth/login', async (credentials, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_API_URL}/login/`, credentials);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data || 'An error occurred');
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem('userInfo');
      localStorage.removeItem('token');
      state.userInfo = null;
      state.token = null;
      state.status = 'idle';
      state.error = null;
    },
    loadTokenFromLocalStorage: (state) => {
      const token = localStorage.getItem('token');
      if (token) {
        state.token = token;
        state.userInfo = JSON.parse(localStorage.getItem('userInfo'));
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(authLogin.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(authLogin.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.userInfo = { message: action.payload.message };
        state.token = action.payload.access;
        localStorage.setItem('userInfo', JSON.stringify({ message: action.payload.message }));
        localStorage.setItem('token', action.payload.access);
      })
      .addCase(authLogin.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const { logout, loadTokenFromLocalStorage } = authSlice.actions;

export default authSlice.reducer;
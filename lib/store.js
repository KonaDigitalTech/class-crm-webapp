import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/auth/authSlice';
import leadsReducer from './features/leads/leadSlice';
import { useSelector, useDispatch } from 'react-redux';

export const makeStore = () => configureStore({
  reducer: {
    auth: authReducer,
    leads: leadsReducer,
  },
});

export const useAppDispatch = () => useDispatch();
export const useAppSelector = useSelector;
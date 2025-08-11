import { configureStore } from '@reduxjs/toolkit';
import authReducer from '@/features/authSlice';
import toastReducer from '@/features/toastSlice';


export default configureStore({
  reducer: {
        auth : authReducer,
        toast : toastReducer,
  }
});
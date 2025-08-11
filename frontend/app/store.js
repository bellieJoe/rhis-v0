import { configureStore } from '@reduxjs/toolkit';
import authReducer from '@/features/authSlice';
import toastReducer from '@/features/toastSlice';
import userReducer from '@/features/userSlice';


export default configureStore({
  reducer: {
        auth : authReducer,
        toast : toastReducer,
        user : userReducer
  }
});
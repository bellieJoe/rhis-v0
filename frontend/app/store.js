import { configureStore } from '@reduxjs/toolkit';
import authReducer from '@/features/authSlice';
import toastReducer from '@/features/toastSlice';
import userReducer from '@/features/userSlice';
import officeReducer from '@/features/officeSlice';
import genericTypeReducer from '@/features/genericTypeSlice';
import errorReducer from '@/features/errorSlice';
import householdReducer from '@/features/householdSlice';


export default configureStore({
  reducer: {
        auth : authReducer,
        toast : toastReducer,
        user : userReducer,
        office : officeReducer,
        genericType : genericTypeReducer,
        error : errorReducer,
        household : householdReducer
  }
});
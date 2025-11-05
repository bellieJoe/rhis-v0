import { configureStore } from '@reduxjs/toolkit';
import authReducer from '@/features/authSlice';
import toastReducer from '@/features/toastSlice';
import userReducer from '@/features/userSlice';
import officeReducer from '@/features/officeSlice';
import genericTypeReducer from '@/features/genericTypeSlice';
import errorReducer from '@/features/errorSlice';
import householdReducer from '@/features/householdSlice';
import householdProfileReducer from '@/features/householdProfileSlice';
import addHouseholdProfileReducer from '@/features/forms/addHouseholdProfileSlice';
import updateHouseholdProfileReducer from '@/features/forms/updateHouseholdProfileSlice';
import updateHouseholdProfileAddtnlInfoReducer from '@/features/forms/updateHouseholdProfileAddtnlInfoSlice';
import updateHealthServiceReducer from '@/features/forms/updateHealthServiceSlice';
import addUserReducer from '@/features/forms/addUserSlice';
import assignBhwFormReducer from '@/features/forms/assignBhwFormSlice';
import addSitioFormReducer from '@/features/forms/addSitioFormSlice';
import updateSitioFormReducer from '@/features/forms/updateSitioFormSlice';
import sitioReducer from '@/features/sitioSlice';
import assignMidwifeReducer from '@/features/forms/assignMidwifeSlice';
import registerMaternalClientReducer from '@/features/forms/registerMaternalClient';
import updateMaternalClientRecordReducer from '@/features/forms/updateMaternalClientRecord';

export default configureStore({
  reducer: {
    auth : authReducer,
    toast : toastReducer,
    user : userReducer,
    office : officeReducer,
    genericType : genericTypeReducer,
    error : errorReducer,
    household : householdReducer,
    householdProfile : householdProfileReducer,
    addHouseholdProfile : addHouseholdProfileReducer,
    updateHouseholdProfile : updateHouseholdProfileReducer,
    updateHouseholdProfileAddtnlInfo : updateHouseholdProfileAddtnlInfoReducer,
    updateHealthService : updateHealthServiceReducer,
    addUser : addUserReducer,
    assignBhwForm : assignBhwFormReducer,
    assignMidwifeForm : assignMidwifeReducer,
    addSitioForm : addSitioFormReducer,
    updateSitioForm : updateSitioFormReducer,
    sitio : sitioReducer,
    registerMaternalClient : registerMaternalClientReducer,
    updateMaternalClientRecord : updateMaternalClientRecordReducer
  }
});
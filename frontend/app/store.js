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
import addBhwReducer from '@/features/forms/addBhwSlice';
import assignBhwFormReducer from '@/features/forms/assignBhwFormSlice';
import assignCaptainFormReducer from '@/features/forms/assignCaptainFormSlice';
import addSitioFormReducer from '@/features/forms/addSitioFormSlice';
import updateSitioFormReducer from '@/features/forms/updateSitioFormSlice';
import sitioReducer from '@/features/sitioSlice';
import assignMidwifeReducer from '@/features/forms/assignMidwifeSlice';
import assignRhuReducer from '@/features/forms/assignRhuSlice';
import registerMaternalClientReducer from '@/features/forms/registerMaternalClientSlice';
import updateMaternalClientRecordReducer from '@/features/forms/updateMaternalClientRecordSlice';
import updateChildcareClientRecordReducer from '@/features/forms/updateChildcareClientRecordSlice';
import registerChildcareClientReducer from '@/features/forms/registerChildcareClientSlice';
import updateFamilyPlanningClientRecordReducer from '@/features/forms/updateFamilyPlanningClientRecordSlice';
import registerFamilyPlanningClientReducer from '@/features/forms/registerFamilyPlanningClientSlice';
import viewMemberRecucer from '@/features/viewMemberSlice';

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
    addBhw : addBhwReducer,
    assignBhwForm : assignBhwFormReducer,
    assignCaptainForm : assignCaptainFormReducer,
    assignMidwifeForm : assignMidwifeReducer,
    assignRhuForm : assignRhuReducer,
    addSitioForm : addSitioFormReducer,
    updateSitioForm : updateSitioFormReducer,
    sitio : sitioReducer,
    registerMaternalClient : registerMaternalClientReducer,
    registerChildcareClient : registerChildcareClientReducer,
    registerFamilyPlanningClient : registerFamilyPlanningClientReducer,
    updateMaternalClientRecord : updateMaternalClientRecordReducer,
    updateChildcareClientRecord : updateChildcareClientRecordReducer,
    updateFamilyPlanningClientRecord : updateFamilyPlanningClientRecordReducer,
    viewMember : viewMemberRecucer
  }
});
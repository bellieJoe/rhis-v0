import { setErrors } from "@/features/errorSlice";
import { setToast } from "@/features/toastSlice";
import { Dispatch } from "@reduxjs/toolkit";
import axios from "./axios";
import { reloadHouseholdProfiles, setHouseholdProfiles } from "@/features/householdProfileSlice";


export const storeHouseholdProfile = async (dispatch : Dispatch, params : {}) : Promise<boolean> => {
    dispatch(setErrors({}));
    try {
        const res  = await axios.post('/api/household-profiles', params);
        dispatch(setToast({
            severity : "success",
            summary : "Success",
            detail : "Household profile created successfully",
            life : 3000
        }));
        dispatch(reloadHouseholdProfiles());
        return true;
    } catch (error : any) {
        if(error.response.status === 422) {
            console.log(error.response.data.errors)
            dispatch(setErrors(error.response.data.errors));
        }
        dispatch(setToast({
            severity :"error", 
            summary : "Error", 
            detail : error.response.data.message, 
            life : 3000
        }));
    }
    return false;
}

export const getHouseholdProfiles = async (dispatch : Dispatch, params : any = {}) => {
    try {
        const response = await axios.get('/api/household-profiles', { params });
        dispatch(setHouseholdProfiles(response.data));
    } catch (error : any) {
        dispatch(setToast({
            severity :"error", 
            summary : "Error", 
            detail : error.response.data.message, 
            life : 3000
        }));
    }
}

export const getHouseholdProfileById = async (dispatch : Dispatch, id : any) => {
    try {
        const response : any = await axios.get(`/api/household-profiles/${id}`).then(res => console.log(res.data));
        return response.data;
    } catch (error : any) {
        dispatch(setToast({
            severity :"error", 
            summary : "Error", 
            detail : error.response.data.message, 
            life : 3000
        }));
    }
}


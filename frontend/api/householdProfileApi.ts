import { setErrors } from "@/features/errorSlice";
import { setToast } from "@/features/toastSlice";
import { Dispatch } from "@reduxjs/toolkit";
import axios from "./axios";
import { reloadHouseholdProfiles, setHouseholdProfiles } from "@/features/householdProfileSlice";
import { getHousehold } from "./householdApi";


export const storeHouseholdProfile = async (dispatch : Dispatch, params : any = {}) : Promise<any> => {
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
        const household = await getHousehold(dispatch, params.household_id);
        return household;
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
        dispatch(setHouseholdProfiles({}));
        const response = await axios.get('/api/household-profiles', { params });
        dispatch(setHouseholdProfiles(response.data));
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

export const getHouseholdProfileById = async (dispatch : Dispatch, id : any) => {
    try {
        const response : any = await axios.get(`/api/household-profiles/${id}`);
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

export const updateHouseholdProfile = async (dispatch : Dispatch, params : any = {}) => {
    try {
        const response : any = await axios.put(`/api/household-profiles/update-main-info`, params);
        return true;
    } catch (error : any) {
        if(error.response.status === 422) {
            dispatch(setErrors(error.response.data.errors));
        }
        dispatch(setToast({
            severity :"error", 
            summary : "Error", 
            detail : error.response.data.message, 
            life : 3000
        }));
    }
}

export const updateHouseholdProfileAddtnlInfo = async (dispatch : Dispatch, params : any = {}) => {
    try {
        const response : any = await axios.put(`/api/household-profiles/update-addtnl-info`, params);
        return true;
    } catch (error : any) {
        if(error.response.status === 422) {
            dispatch(setErrors(error.response.data.errors));
        }
        dispatch(setToast({
            severity :"error", 
            summary : "Error", 
            detail : error.response.data.message, 
            life : 3000
        }));
    }
}

export const deleteHouseholdProfile = async (dispatch : Dispatch, id : any) => {
    try {
        const response : any = await axios.delete(`/api/household-profiles/${id}`);
        dispatch(setToast({
            severity : "success",
            summary : "Success",
            detail : "Household profile deleted successfully",
            life : 3000
        }));
        dispatch(reloadHouseholdProfiles());
        return true;
    } catch (error : any) {
        dispatch(setToast({
            severity :"error", 
            summary : "Error", 
            detail : error.response.data.message, 
            life : 3000
        }));
    }
}

export const getFamilyHeads = async (dispatch : Dispatch, params : any = {}) => {
    try {
        const response : any = await axios.get(`/api/household-profiles/family-heads/${params.household_id}`);
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


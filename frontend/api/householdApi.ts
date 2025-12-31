import { Dispatch } from "@reduxjs/toolkit";
import axios from "./axios";
import { setToast } from "@/features/toastSlice";
import { setErrors } from "@/features/errorSlice";
import { setHouseholds } from "@/features/householdSlice";

export const getHouseholds = async (dispatch : Dispatch, params : any = {}) => {
    try {
        const response = await axios.get('/api/households', { params });
        dispatch(setHouseholds(response.data));
    } catch (error : any) {
        dispatch(setToast({
            severity :"error", 
            summary : "Error", 
            detail : error.response.data.message, 
            life : 3000
        }));
    }
}

export const getHousehold = async (dispatch : Dispatch, id : any) => {
    try {
        const response = await axios.get(`/api/households/${id}`);
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
export const storeHousehold = async (dispatch : Dispatch, params : any = {}) : Promise<any> => {
    try {
        const response = await axios.post('/api/households', params);
        dispatch(setToast({
            severity : "success",
            summary : "Success",
            detail : "Household created successfully",
            life : 3000
        }));
        return response.data;
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
        return false;
    }
}

export const deleteHousehold = async (dispatch : Dispatch, id : any) => {
    try {
        await axios.delete(`/api/households/${id}`);
        dispatch(setToast({
            severity : "success",
            summary : "Success",
            detail : "Household deleted successfully",
            life : 3000
        }));
        return true;
    } catch (error : any) {
        dispatch(setToast({
            severity :"error", 
            summary : "Error", 
            detail : error.response.data.message, 
            life : 3000
        }));
    }
    return false;
}

export const getHouseholdMembers = async (dispatch : Dispatch, household_id : any) => {
    try {
        const response = await axios.get(`/api/households/get-members/${household_id}`);
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

export const countPregnantByHousehold = async (dispatch : Dispatch, household_id : any) => {
    try {
        const res = await axios.get(`/api/households/count-pregnants/${household_id}`);
        return res.data;
    } catch (error : any) {
        dispatch(setToast({
            severity :"error", 
            summary : "Error", 
            detail : error.response?.data?.message, 
            life : 3000
        }))
    }
}

export const countSeniorsByHousehold = async (dispatch : Dispatch, household_id : any) => {
    try {
        const res = await axios.get(`/api/households/count-seniors/${household_id}`);
        return res.data;
    } catch (error : any) {
        dispatch(setToast({
            severity :"error", 
            summary : "Error", 
            detail : error.response?.data?.message, 
            life : 3000
        }))
    }
}

export const setHouseholdHead = async (dispatch : Dispatch, hosuehold_profile_id : any) => {
    try {
        const res = await axios.post(`/api/household-profiles/set-household-head/${hosuehold_profile_id}`);
        dispatch(setToast({
            severity : "success",
            summary : "Success",
            detail : "Household head set successfully",
            life : 3000
        }))
    } catch (error : any) {
        dispatch(setToast({
            severity :"error", 
            summary : "Error", 
            detail : error.response?.data?.message, 
            life : 3000
        }))
    }
}

export const countHouseholdByBarangay = async (dispatch : Dispatch, barangay_id : any) => {
    try {
        const res = await axios.get(`/api/households/count-by-barangay/${barangay_id}`);
        return res.data;
    } catch (error : any) {
        dispatch(setToast({
            severity :"error", 
            summary : "Error", 
            detail : error.response?.data?.message, 
            life : 3000
        }));
    }
}


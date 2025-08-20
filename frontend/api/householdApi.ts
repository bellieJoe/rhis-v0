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
export const storeHousehold = async (dispatch : Dispatch, params : any = {}) : Promise<boolean> => {
    try {
        await axios.post('/api/households', params);
        dispatch(setToast({
            severity : "success",
            summary : "Success",
            detail : "Household created successfully",
            life : 3000
        }));
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
        return false
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
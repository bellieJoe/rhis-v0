import { setToast } from "@/features/toastSlice";
import { Dispatch } from "@reduxjs/toolkit";
import axios from "./axios";

export const getBarangays = async (dispatch : Dispatch, params : any = {}) => {
    try {
        const response  = await axios.get("api/barangays/addresses", { params });
        return response.data;
    } catch (error : any) {
        dispatch(setToast({
            severity :"error", 
            summary : "Error", 
            detail : error.response.data.message, 
            life : 3000
        }))
    }
}

export const getBarangayList = async (dispatch : Dispatch, params : any = {}) => {
    try {
        const response  = await axios.get("api/barangays", { params });
        return response.data;
    } catch (error : any) {
        console.log(error)
        dispatch(setToast({
            severity :"error", 
            summary : "Error", 
            detail : error.response.data.message, 
            life : 3000
        }))
    }
}

export const getMunicipalityList = async (dispatch : Dispatch, params : any = {}) => {
    try {
        const response  = await axios.get("api/municipalities", { params });
        return response.data;
    } catch (error : any) {
        dispatch(setToast({
            severity :"error", 
            summary : "Error", 
            detail : error.response.data.message, 
            life : 3000
        }))
    }
}
import { setToast } from "@/features/toastSlice";
import axios from "./axios";
import { Dispatch } from "@reduxjs/toolkit";

export const storeBhwDesgination = async (dispatch : Dispatch, params : any) => {
    try {
        const response = await axios.post('/api/bhw-designations', params);
        dispatch(setToast({severity : "success", summary : "Success", detail : "BHW Designation updated successfully", life : 3000}));
        return true;
    } catch (error : any) {
        dispatch(setToast({severity : "error", summary : "Error", detail : error.response.data.message, life : 3000}));
        return false;
    }
}

export const storeMidwifeDesignation = async (dispatch : Dispatch, params : any) => {
    try {
        const response = await axios.post('/api/midwife-designations', params);
        dispatch(setToast({severity : "success", summary : "Success", detail : "Midwife Designation updated successfully", life : 3000}));
        return true;
    } catch (error : any) {
        dispatch(setToast({severity : "error", summary : "Error", detail : error.response.data.message, life : 3000}));
        return false;
    }
}

export const getBhwDesignationsByUserId = async (dispatch : Dispatch, params : any = {}) => {
    try {
        const response = await axios.get('/api/bhw-designations/get-by-user-id', { params });
        return response.data;
    } catch (error : any) {
        dispatch(setToast({severity : "error", summary : "Error", detail : error.response.data.message, life : 3000}));
    }
}

export const getMidwifeDesignationsByUserId = async (dispatch : Dispatch, params : any = {}) => {
    try {
        const response = await axios.get('/api/midwife-designations/get-by-user-id', { params });
        return response.data;
    } catch (error : any) {
        dispatch(setToast({severity : "error", summary : "Error", detail : error.response.data.message, life : 3000}));
    }
}
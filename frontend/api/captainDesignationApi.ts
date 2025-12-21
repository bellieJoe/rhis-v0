import { Dispatch } from "@reduxjs/toolkit";
import axios from "./axios";
import { setToast } from "@/features/toastSlice";
import { setErrors } from "@/features/errorSlice";


export const storeCaptainDesignation = async (dispatch: Dispatch, params: any) => {
    try {
        await axios.post('/api/captain-designations', params);
        dispatch(setToast({severity : "success", summary : "Success", detail : "Captain Designation updated successfully", life : 3000}));
        return true;
    } catch (error : any) {
        if(error.response.status === 422) {
            dispatch(setErrors(error.response.data.errors));
        }
        dispatch(setToast({severity : "error", summary : "Error", detail : error.response.data.message, life : 3000}));
        return false;
    }
}

export const getCaptainDesignationByUserId = async (dispatch: Dispatch, params: any) => {
    try {
        const response = await axios.get('/api/captain-designations/get-by-user-id/' + params.user_id);
        return response.data;
    } catch (error : any) {
        dispatch(setToast({severity : "error", summary : "Error", detail : error.response.data.message, life : 3000}));
    }
}
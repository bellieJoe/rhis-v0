import { Dispatch } from "@reduxjs/toolkit";
import axios from "./axios";
import { setToast } from "@/features/toastSlice";

export const getEnvironmental = async (dispatch : Dispatch, params : any = {}) => {
    try {
        const response = await axios.get('/api/pho-reports/environmental', { params });
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
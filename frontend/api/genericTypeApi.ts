import { setToast } from "@/features/toastSlice";
import { Dispatch } from "@reduxjs/toolkit";
import axios from "./axios";
import { setGenericTypes } from "@/features/genericTypeSlice";


export const getGenericTypes = async (dispatch : Dispatch, params : any = {}) => {
    try {
        const response = await axios.get('/api/generic-types', { params });
        dispatch(setGenericTypes(response.data));
    } catch (error : any) {
        dispatch(setToast({
            severity :"error", 
            summary : "Error", 
            detail : error.response.data?.message, 
            life : 3000
        }))
    }
}
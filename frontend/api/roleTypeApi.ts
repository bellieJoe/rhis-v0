import { Dispatch } from "@reduxjs/toolkit";
import axios from "./axios";
import { setToast } from "@/features/toastSlice";


export const getRoleTypes = async (dispatch : Dispatch, params : any = {}) => {
    try {
        const response = await axios('/api/role-types');
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
import { Dispatch } from "@reduxjs/toolkit";
import axios from "./axios";
import { setUsers } from "@/features/userSlice";
import { setToast } from "@/features/toastSlice";
import { setOffices } from "@/features/officeSlice";

export const getOffices = async (dispatch : Dispatch, params : any = {}) => {
    try {
        const response = await axios.get('/api/offices', { params });
        dispatch(setOffices(response.data));
    } catch (error : any) {
        dispatch(setToast({
            severity :"error", 
            summary : "Error", 
            detail : error.response.data.message, 
            life : 3000
        }));
    }
}
import { Dispatch } from "@reduxjs/toolkit";
import axios from "./axios";
import { setUsers } from "@/features/userSlice";
import { setToast } from "@/features/toastSlice";

export const getUsers = async (dispatch : Dispatch, params : any = {}) => {
    try {
        const response = await axios.get('/api/users', { params });
        dispatch(setUsers(response.data));
    } catch (error : any) {
        dispatch(setToast({
            severity :"error", 
            summary : "Error", 
            detail : error.response.data.message, 
            life : 3000
        }));
        console.log(error)
    }
}
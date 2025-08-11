import { setToast } from "@/features/toastSlice";
import { dispatchError, dispatchSuccess } from "@/utils/toast";
import { Dispatch } from "@reduxjs/toolkit";
import axios from "./axios";

export const login = async (dispatch  : Dispatch, params : any = {}) : Promise<boolean> => {
    try {
        const session = await axios.get('/sanctum/csrf-cookie');
        const response = await axios.post('/auth/login', params);
        dispatchSuccess(dispatch, "Logged in successfully.");
        return true;
    } catch (error : any) {
        console.log(error);
        dispatchError(dispatch, error.response.data.message);
        return false;
    }
}

export const logout = async (dispatch  : Dispatch) : Promise<boolean> => {
    try {
        const response = await axios.post('/api/auth/logout');
        dispatchSuccess(dispatch, "Logged out successfully.");
        return true;
    } catch (error : any) {
        dispatchError(dispatch, error.response.data.message);
        return false;
    }
}
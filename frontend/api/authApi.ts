import { setToast } from "@/features/toastSlice";
import { dispatchError, dispatchSuccess } from "@/utils/toast";
import { Dispatch } from "@reduxjs/toolkit";
import axios from "./axios";
import { setUser } from "@/features/authSlice";

export const login = async (dispatch  : Dispatch, params : any = {}) : Promise<boolean> => {
    try {
        const session = await axios.get('/sanctum/csrf-cookie');
        const response = await axios.post('/auth/login', params);
        dispatch(setUser(response.data));
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

export const getAuth = async (dispatch : Dispatch) => {
    try {
        const response = await axios.get('/api/auth/user');
        dispatch(setUser(response.data));
    } catch (error : any) {
        dispatchError(dispatch, error.response.data.message);
    }
}

export const isAuth = async (dispatch : Dispatch) : Promise<boolean> => {
    try {
        const response = await axios.get('/api/auth/is-auth');
        return response.data;
    } catch (error : any) {
        dispatch(setToast({severity : "error", summary : "Error", detail : error.response.data.message, life : 3000}));
        return false;
    }
}


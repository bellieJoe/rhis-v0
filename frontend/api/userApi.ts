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

export const storeUser = async (dispatch : Dispatch, params : any = {}) => {
    try {
        const response = await axios.post('/api/users', params);
        return true;
    } catch (error : any) {
        dispatch(setToast({
            severity :"error", 
            summary : "Error", 
            detail : error.response.data.message, 
            life : 3000
        }));
        return false;
    }
}

export const getBhwsByCaptain = async (dispatch : Dispatch, user_id : any) => {
    try {
        const response = await axios.get(`/api/users/get-bhws-by-captain/${user_id}`);
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

export const addBhw = async (dispatch : Dispatch, params : any = {}) => {
    try {
        const response = await axios.post('/api/users/add-bhw', params);
        return true;
    } catch (error : any) {
        dispatch(setToast({
            severity :"error", 
            summary : "Error", 
            detail : error.response.data.message, 
            life : 3000
        }));
        return false;
    }
}
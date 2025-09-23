import { setToast } from "@/features/toastSlice";
import { Dispatch } from "@reduxjs/toolkit";
import axios from "./axios";
import { setErrors } from "@/features/errorSlice";
import { reloadSitios, setSitios } from "@/features/sitioSlice";


export const getSitios = async (dispatch : Dispatch, params : any = {}) => {
    try {
        const response = await axios.get('/api/sitios', { params });
        dispatch(setSitios(response.data));
        return response.data;
    } catch (error : any) {
        setToast({severity : "error", summary : "Error", detail : error.response.data.message, life : 3000});
    }
}

export const storeSitio = async (dispatch : Dispatch, params : any) => {
    try {
        const response = await axios.post('/api/sitios', params);
        dispatch(setToast({severity : "success", summary : "Success", detail : "Sitio created successfully", life : 3000}));
        return true;
    } catch (error : any) {
        if(error.response.status === 422) {
            dispatch(setErrors(error.response.data.errors));
        }
        dispatch(setToast({severity :"error", summary : "Error", detail : error.response.data.message, life : 3000}));
        return false;
    }
}

export const deleteSitio = async (dispatch : Dispatch, id : number) => {
    try {
        const response = await axios.delete('/api/sitios/' + id);
        dispatch(setToast({severity : "success", summary : "Success", detail : "Sitio deleted successfully", life : 3000}));
        return true;
    } catch (error : any) {
        dispatch(setToast({severity :"error", summary : "Error", detail : error.response.data.message, life : 3000}));
        return false;
    }
}

export const updateSitio = async (dispatch : Dispatch, params : any) => {
    try {
        const response = await axios.put('/api/sitios/' + params.id, params);
        dispatch(setToast({severity : "success", summary : "Success", detail : "Sitio updated successfully", life : 3000}));
        return true;
    } catch (error : any) {
        if(error.response.status === 422) {
            dispatch(setErrors(error.response.data.errors));
        }
        dispatch(setToast({severity :"error", summary : "Error", detail : error.response.data.message, life : 3000}));
        return false;
    }
}
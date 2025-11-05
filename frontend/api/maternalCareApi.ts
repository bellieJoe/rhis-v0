import { Dispatch } from "@reduxjs/toolkit"
import axios from "./axios"
import { setToast } from "@/features/toastSlice";

export async function getCandidates(dispatch : Dispatch, params : any = {}) {
    try {
        const response = await axios.get('/api/maternal-clients/get-candidates', { params });
        return response.data;
    } catch (error:any) {
        dispatch(setToast({severity : "error", summary : "Error", detail : error.response.data.message, life : 3000}));
    }
}

export async function registerMaternalClient(dispatch : Dispatch, params : any) {
    try {
        await axios.post('/api/maternal-clients/register', params);
        dispatch(setToast({severity : "success", summary : "Success", detail : "Maternal client registered successfully", life : 3000}));
        return true;
    } catch (error:any) {
        dispatch(setToast({severity : "error", summary : "Error", detail : error.response.data.message, life : 3000}));
    }
}

export async function getMaternalClients(dispatch : Dispatch, params : any = {}) {
    try {
        const response = await axios.get('/api/maternal-clients', { params });
        return response.data;
    } catch (error:any) {
        dispatch(setToast({severity : "error", summary : "Error", detail : error.response.data.message, life : 3000}));
    }
}

export async function getMaternalClientById(dispatch : Dispatch, id:any) {
    try {
        const response = await axios.get('/api/maternal-clients/get-by-id/' + id);
        return response.data;
    } catch (error:any) {
        dispatch(setToast({severity : "error", summary : "Error", detail : error.response.data.message, life : 3000}));
    }
}
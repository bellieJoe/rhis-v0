import { setToast } from "@/features/toastSlice"
import axios from "./axios";
import { Dispatch } from "@reduxjs/toolkit";


export const getCandidates = async (dispatch : any, params : any = {}) => {
    try {
        const response = await axios.get('/api/childcare-clients/get-candidates', { params });
        return response.data;
    } catch (error) {
        setToast({severity : "error", summary : "Error", detail : "Failed to fetch candidates", life : 3000});
    }
}

export async function getChildcareClients(dispatch : Dispatch, params : any = {}) {
    try {
        const response = await axios.get('/api/maternal-clients', { params });
        return response.data;
    } catch (error:any) {
        dispatch(setToast({severity : "error", summary : "Error", detail : error.response.data.message, life : 3000}));
    }
}
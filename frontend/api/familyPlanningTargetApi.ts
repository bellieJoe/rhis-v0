import { setToast } from "@/features/toastSlice"
import axios from "./axios";
import { Dispatch } from "@reduxjs/toolkit";
import { setErrors } from "@/features/errorSlice";


export const getCandidates = async (dispatch : any, params : any = {}) => {
    try {
        const response = await axios.get('/api/family-planning-clients/get-candidates', { params });
        return response.data;
    } catch (error) {
        setToast({severity : "error", summary : "Error", detail : "Failed to fetch candidates", life : 3000});
    }
}

export async function getFamilyPlanningClients(dispatch : Dispatch, params : any = {}) {
    try {
        const response = await axios.get('/api/family-planning-clients', { params });
        return response.data;
    } catch (error:any) {
        dispatch(setToast({severity : "error", summary : "Error", detail : error.response.data.message, life : 3000}));
    }
}

export async function registerFamilyPlanningClient(dispatch : Dispatch, params : any) {
    try {
        await axios.post('/api/family-planning-clients/register', params);
        dispatch(setToast({severity : "success", summary : "Success", detail : "Family Planning client registered successfully", life : 3000}));
        return true;
    } catch (error:any) {
        dispatch(setToast({severity : "error", summary : "Error", detail : error.response.data.message, life : 3000}));
    }
}

export async function deleteFamilyPlanningClientRecord(dispatch : Dispatch, id : any) {
    try {
        await axios.delete('/api/family-planning-clients/delete/' + id);
        dispatch(setToast({severity : "success", summary : "Success", detail : "Family Planning client record deleted successfully", life : 3000}));
        return true;
    } catch (error:any) {
        dispatch(setToast({severity : "error", summary : "Error", detail : error.response.data.message, life : 3000}));
    }
}

export async function updateFamilyPlanningClient(dispatch : Dispatch, params : any) {
    try {
        await axios.post('/api/family-planning-clients/update', params);
        dispatch(setToast({severity : "success", summary : "Success", detail : "Family Planning client updated successfully", life : 3000}));
        return true;
    } catch (error:any) {
        if(error.response.status === 422) {
            dispatch(setErrors(error.response.data.errors));
        }
        dispatch(setToast({severity : "error", summary : "Error", detail : error.response.data.message, life : 3000}));
    }
}


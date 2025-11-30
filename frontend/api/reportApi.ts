import { setToast } from "@/features/toastSlice";
import { Dispatch } from "@reduxjs/toolkit";
import axios from "./axios";
import { setErrors } from "@/features/errorSlice";

export const getSummaryReport = async (dispatch : Dispatch, params : any = {}) => {
    try {
        const response = await axios.get('/api/reports/summary-report', { params });
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

export const submitReport = async (dispatch : Dispatch, params : any = {}, type : number) => {
    try {
        const response = await axios.post('/api/reports/submit', {
            filters : params,
            type : type
        });
        dispatch(setToast({severity : "success", summary : "Success", detail : "Report submitted successfully", life : 3000}));
    } catch (error : any) {
        dispatch(setToast({
            severity :"error", 
            summary : "Error", 
            detail : error.response.data.message, 
            life : 3000
        }));
    }
}

export const resubmitReport = async (dispatch : Dispatch, id : any) => {
    try {
        const response = await axios.post(`/api/reports/resubmit/${id}`);
        dispatch(setToast({severity : "success", summary : "Success", detail : "Report resubmitted successfully", life : 3000}));
    } catch (error : any) {
        dispatch(setToast({
            severity :"error", 
            summary : "Error", 
            detail : error.response.data.message, 
            life : 3000
        }));
    }
}

export const rejectReport = async (dispatch : Dispatch, params : any = {}, id : any) : Promise<Boolean> => {
    try {
        const response = await axios.post(`/api/reports/reject/${id}`, params);
        dispatch(setToast({severity : "success", summary : "Success", detail : "Report rejected successfully", life : 3000}));
        return true;
    } catch (error : any) {
        if(error.response.status === 422) {
            dispatch(setErrors(error.response.data.errors));
        }
        dispatch(setToast({
            severity :"error", 
            summary : "Error", 
            detail : error.response.data.message, 
            life : 3000
        }));
        return false;
    }
}

export const approveReport = async (dispatch : Dispatch, params : any = {}, id : any) : Promise<Boolean> => {
    try {
        const response = await axios.post(`/api/reports/approve/${id}`, params);
        dispatch(setToast({severity : "success", summary : "Success", detail : "Report approved successfully", life : 3000}));
        return true;
    } catch (error : any) {
        if(error.response.status === 422) {
            dispatch(setErrors(error.response.data.errors));
        }
        dispatch(setToast({
            severity :"error", 
            summary : "Error", 
            detail : error.response.data.message, 
            life : 3000
        }));
        return false;
    }
}

export const deleteReport = async (dispatch : Dispatch, id : any) => {
    try {
        const response = await axios.delete(`/api/reports/delete/${id}`);
        dispatch(setToast({severity : "success", summary : "Success", detail : "Report deleted successfully", life : 3000}));
    } catch (error : any) {
        dispatch(setToast({
            severity :"error", 
            summary : "Error", 
            detail : error.response.data.message, 
            life : 3000
        }));
    }
}

export const getSubmittedReports = async (dispatch : Dispatch, params : any = {}) => {
    try {
        const response = await axios.get(`/api/reports/submitted`, params);
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

export const getForApprovalReports = async (dispatch : Dispatch, params : any = {})  => {
    try {
        const response = await axios.get(`/api/reports/for-approval`, params);
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
import { setErrors } from "@/features/errorSlice";
import { Dispatch } from "@reduxjs/toolkit";
import axios from "./axios";
import { setToast } from "@/features/toastSlice";

export const storePregnant = async (dispatch : Dispatch, params : any = {}) : Promise<boolean> => {
    setErrors({});
    try {
        const response = await axios.post('/api/healthcare-services/pregnants', params);
        dispatch(setToast({
            severity : "success",
            summary : "Success",
            detail : "Pregnant created successfully",
            life : 3000
        }));
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

export const storeGaveBirth = async (dispatch : Dispatch, params : any = {}) : Promise<boolean> => {
    setErrors({});
    try {
        const response = await axios.post('/api/healthcare-services/gave-births', params);
        dispatch(setToast({
            severity : "success",
            summary : "Success",
            detail : "Gave birth created successfully",
            life : 3000
        }));
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

export const storeNewBorn = async (dispatch : Dispatch, params : any = {}) : Promise<boolean> => {
    setErrors({});
    try {
        const response = await axios.post('/api/healthcare-services/new-borns', params);
        dispatch(setToast({
            severity : "success",
            summary : "Success",
            detail : "New born created successfully",
            life : 3000
        }));
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

export const storeVaccinated = async (dispatch : Dispatch, params : any = {}) : Promise<boolean> => {
    setErrors({});
    try {
        const response = await axios.post('/api/healthcare-services/vaccinateds', params);
        dispatch(setToast({
            severity : "success",
            summary : "Success",
            detail : "Vaccinated created successfully",
            life : 3000
        }));
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

export const storeFamilyPlanning = async (dispatch : Dispatch, params : any = {}) : Promise<boolean> => {
    setErrors({});
    try {
        const response = await axios.post('/api/healthcare-services/family-plannings', params);
        dispatch(setToast({
            severity : "success",
            summary : "Success",
            detail : "Family planning created successfully",
            life : 3000
        }));
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

export const storeDeath = async (dispatch : Dispatch, params : any = {}) : Promise<boolean> => {
    setErrors({});
    try {
        const response = await axios.post('/api/healthcare-services/deaths', params);
        dispatch(setToast({
            severity : "success",
            summary : "Success",
            detail : "Death created successfully",
            life : 3000
        }));
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

export const storeSick = async (dispatch : Dispatch, params : any = {}) : Promise<boolean> => {
    setErrors({});
    try {
        const response = await axios.post('/api/healthcare-services/sicks', params);
        dispatch(setToast({
            severity : "success",
            summary : "Success",
            detail : "Sick created successfully",
            life : 3000
        }));
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

export const storeHasHighblood = async (dispatch : Dispatch, params : any = {}) : Promise<boolean> => {
    setErrors({});
    try {
        const response = await axios.post('/api/healthcare-services/has-high-bloods', params);
        dispatch(setToast({
            severity : "success",
            summary : "Success",
            detail : "Has high blood created successfully",
            life : 3000
        }));
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

export const storeHasDiabetes = async (dispatch : Dispatch, params : any = {}) : Promise<boolean> => {
    setErrors({});
    try {
        const response = await axios.post('/api/healthcare-services/has-diabetes', params);
        dispatch(setToast({
            severity : "success",
            summary : "Success",
            detail : "Has diabetes created successfully",
            life : 3000
        }));
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

export const storeUnirinalysis = async (dispatch : Dispatch, params : any = {}) : Promise<boolean> => {
    setErrors({});
    try {
        const response = await axios.post('/api/healthcare-services/unirinalysis', params);
        dispatch(setToast({
            severity : "success",
            summary : "Success",
            detail : "Unirinalysis created successfully",
            life : 3000
        }));
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

export const storeHasCancer = async (dispatch : Dispatch, params : any = {}) : Promise<boolean> => {
    setErrors({});
    try {
        const response = await axios.post('/api/healthcare-services/has-cancers', params);
        dispatch(setToast({
            severity : "success",
            summary : "Success",
            detail : "Has cancer created successfully",
            life : 3000
        }));
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

export const hasEpilepsy = async (dispatch : Dispatch, params : any = {}) : Promise<boolean> => {
    setErrors({});
    try {
        const response = await axios.post('/api/healthcare-services/has-epilepsies', params);
        dispatch(setToast({
            severity : "success",
            summary : "Success",
            detail : "Has epilepsy created successfully",
            life : 3000
        }));
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

export const storeAnimalBites = async (dispatch : Dispatch, params : any = {}) : Promise<boolean> => {
    setErrors({});
    try {
        const response = await axios.post('/api/healthcare-services/animal-bites', params);
        dispatch(setToast({
            severity : "success",
            summary : "Success",
            detail : "Animal bite created successfully",
            life : 3000
        }));
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
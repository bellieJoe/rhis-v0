import { setToast } from "@/features/toastSlice";
import { Dispatch } from "@reduxjs/toolkit";


export const dispatchError = (dispatch : Dispatch, message : string) => {
    dispatch(setToast({
        severity :"error", 
        summary : "Error", 
        detail : message, 
        life : 3000
    }))
}

export const dispatchSuccess = (dispatch : Dispatch, message : string) => {
    dispatch(setToast({
        severity :"success", 
        summary : "Success", 
        detail : message, 
        life : 3000
    }))
}
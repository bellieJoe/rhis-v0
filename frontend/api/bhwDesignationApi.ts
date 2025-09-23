import { setToast } from "@/features/toastSlice";
import axios from "./axios";

export const storeBhwDesgination = async (dispatch : Dispatch, params : any) => {
    try {
        const response = await axios.post('/api/bhw-designations', params);
        dispatch(setToast({severity : "success", summary : "Success", detail : "BHW Designation updated successfully", life : 3000}));
        return true;
    } catch (error : any) {
        dispatch(setToast({severity : "error", summary : "Error", detail : error.response.data.message, life : 3000}));
        return false;
    }
}
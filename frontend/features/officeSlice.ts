import { createSlice } from "@reduxjs/toolkit";


export const officeSlice = createSlice({
    name : "office",
    initialState : {
        office : {},
        offices : []
    },
    reducers : {
        setOffice : (state, action) => {
            state.office = action.payload
        },
        setOffices : (state, action) => {
            state.offices = action.payload
        }
    }
});

export const { setOffice, setOffices } = officeSlice.actions;

export default officeSlice.reducer;
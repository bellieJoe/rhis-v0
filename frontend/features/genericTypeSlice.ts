import { createSlice } from "@reduxjs/toolkit";


export const genericTypeSlice = createSlice({
    name : "genericType",
    initialState : {
        genericType : {},
        genericTypes : []
    },
    reducers : {
        setGenericType : (state, action) => {
            state.genericType = action.payload
        },
        setGenericTypes : (state, action) => {
            state.genericTypes = action.payload
        }
    }
});

export const { setGenericType, setGenericTypes } = genericTypeSlice.actions;

export default genericTypeSlice.reducer;
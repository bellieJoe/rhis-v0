import { createSlice } from "@reduxjs/toolkit";


export const addSitioFormSlice = createSlice({
    name: 'addSitioForm',
    initialState: {
        visible : false
    },
    reducers: {
        addSitio : (state : any) => { state.visible = true; },
        hideAddSitio : (state : any) => { state.visible = false; },
    },
});

export const { addSitio, hideAddSitio } = addSitioFormSlice.actions;

export default addSitioFormSlice.reducer;
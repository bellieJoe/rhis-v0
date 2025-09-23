import { createSlice } from "@reduxjs/toolkit";


export const updateSitioFormSlice = createSlice({
    name: 'updateSitioForm',
    initialState: {
        visible : false,
        sitio : {}
    },
    reducers: {
        showUpdateSitio : (state : any, action) => { state.visible = true; state.sitio = action.payload.sitio; console.log("show update sitio", action.payload.sitio) },
        hideUpdateSitio : (state : any) => { state.visible = false; state.sitio = {}; },
    },
});

export const { showUpdateSitio, hideUpdateSitio } = updateSitioFormSlice.actions;

export default updateSitioFormSlice.reducer;
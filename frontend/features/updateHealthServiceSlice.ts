import { createSlice } from "@reduxjs/toolkit";


export const updateHealthServiceSlice = createSlice({
    name: 'updateHealthService',
    initialState: {
        visible : false
    },
    reducers: {
        showUpdateHealthService : (state : any) => { state.visible = true;
            console.log("show add household")
        },
        hideUpdateHealthService : (state : any) => { state.visible = false; },
    },
});

export const { showUpdateHealthService, hideUpdateHealthService } = updateHealthServiceSlice.actions;

export default updateHealthServiceSlice.reducer;
import { createSlice } from "@reduxjs/toolkit"

interface SitioInterface {
    sitios : any,
    reload : boolean
}
export const sitioSlice = createSlice({
    name : "sitio",
    initialState : {
        sitios : null,
        reload  : false
    },
    reducers : {
        reloadSitios : (state : any) => {
            state.reload = !state.reload
        },
        setSitios : (state : any, action:any) => { state.sitios = action.payload }
    }
});

export const { reloadSitios, setSitios } = sitioSlice.actions;

export default sitioSlice.reducer;


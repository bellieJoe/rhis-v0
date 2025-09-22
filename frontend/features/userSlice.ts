import { createSlice } from "@reduxjs/toolkit";


export const userSlice = createSlice({
    name : "user",
    initialState : {
        user : {},
        users : [],
        reload : false
    },
    reducers : {
        setUsers : (state, action) => {
            state.users = action.payload
        },
        setUser : (state, action) => {
            state.user = action.payload
        },
        reloadUsers : (state) => {
            state.reload = !state.reload
        }
    }
});

export const { setUsers, setUser, reloadUsers } = userSlice.actions;

export default userSlice.reducer;
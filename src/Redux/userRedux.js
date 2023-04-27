import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: {
        currentUser: null,
        isFetching: false,
        error: false
    },
    reducers: {
        loginStart: (state) => {
            state.isFetching = true;
        },
        loginSuccess: (state, action) => {
            state.isFetching = false;
            state.currentUser = action.payload;
        },
        loginFailure: (state) => {
            state.isFetching = false;
            state.error = true;
        },
        logOut: (state) => {
            state.currentUser = null;
            state.isFetching = false;
            state.error = false;
        },
        signupStart: (state) => {
            state.isFetching = true;
        },
        signupSuccess: (state) => {
            state.isFetching = false;
            state.error = false;
        },
        signupFailure: (state) => {
            state.isFetching = false;
            state.error = true;
        }
    },
});

export const { loginStart, loginSuccess, loginFailure, logOut, signupStart, signupSuccess, signupFailure } = userSlice.actions;
export default userSlice.reducer;
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Cookies from "universal-cookie";
const cookies = new Cookies();

const initState = {
    switch: false,
    user: cookies.get("user"),
    loading: false,
}

const rootReducer = createSlice({
    name: "main",
    initialState: initState,
    reducers: {
        onSwitch: (state, action) => {
            state.switch = action.payload
        },
        onLogin: (state, action) => {
            state.user = action.payload
        },
        onExit: (state, action) => {
            state.user = action.payload
        },
        isLoading: (state, action) => {
            state.loading = action.payload
        },
    },
    // extra reducer
    extraReducers: (builder) => {
        builder
        // .addCase(getLastRequestId.pending, (state, action) => {
        //     state.loading = false;
        // })
        // .addCase(getLastRequestId.fulfilled, (state, action) => {
        //     state.lastRequestId = action.payload;
        //     state.loading = false;
        // })
        // .addCase(getLastRequestId.rejected, (state, action) => {
        //     state.loading = false;
        // })

    }
});


export const { onSwitch, onLogin, onExit, isLoading } = rootReducer.actions;
export default rootReducer;
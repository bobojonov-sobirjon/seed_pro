import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstances } from "../../config/config";

const initState = {
    loading: false,
    allUsers: [],
}

// ------------------------------------------------------------ all users chat ---------------------------------------------------------------------------

const chatReducer = createSlice({
    name: "chat",
    initialState: initState,
    reducers: {
        isLoading: (state, action) => {
            state.loading = action.payload
        },
    },
    // extra reducer
    extraReducers: (builder) => {
        builder
        // .addCase(getAllChatUsers.pending, (state, action) => {
        //     state.loading = true;
        // })
        // .addCase(getAllChatUsers.fulfilled, (state, action) => {
        //     state.allUsers = action.payload;
        //     state.loading = false;
        // })
        // .addCase(getAllChatUsers.rejected, (state, action) => {
        //     state.loading = false;
        // })
    }
});

// delete one notification
export const deleteOneConversation = createAsyncThunk(
    'chat/deleteConversation',
    async (item, { getState }) => {
        try {
            const res = await axiosInstances.delete(`/chat/conversation/${item.id}/`);
            window.location.reload();
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
);


export const { isLoading } = chatReducer.actions;
export default chatReducer;
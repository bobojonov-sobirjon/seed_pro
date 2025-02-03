import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstances } from "../../config/config";
import { getToast, getToastWarn } from "../../utils/options";

const initState = {
    loading: false,
    allNotifications: [],
}

// ------------------------------------------------------------ self projects ---------------------------------------------------------------------------
// get all notifications
export const getAllNotifications = createAsyncThunk(
    'get/getAllNotifications',
    async (obj) => {
        try {
            const res = await axiosInstances.get(`/chat/notification/`, { signal: obj?.signal });
            return res.data?.notification;
        } catch (error) {
            if (error.name) {
                // console.log('successfully aborted');
            } else {
                // handle error
                // console.log(error);
            }
        }
    }
)

// delete one notification
export const deleteOneNotification = createAsyncThunk(
    'delete/deleteOneNotification',
    async (item, { getState }) => {
        const allNotifications = getState().notificationsReducer.allNotifications; // <-- invoke and access state object
        try {
            const res = await axiosInstances.delete(`/chat/notification/${item.id}/`);
            if (res.status === 200 || res.status == 201 || res.status == 204) {
                // getToast("Удален успешно.");
                return allNotifications.filter(el => el.id !== item.id);
            } else {
                getToastWarn(res?.message || res.data?.message || "Есть проблема с сервером.");
                return allNotifications;
            }
        } catch (error) {
            if (error.name) {
                // console.log('successfully aborted');
            } else {
                // handle error
                // console.log(error);
            }
        }
    }
)

const notificationsReducer = createSlice({
    name: "projects",
    initialState: initState,
    reducers: {
        isLoading: (state, action) => {
            state.loading = action.payload
        },
    },
    // extra reducer
    extraReducers: (builder) => {
        builder
            .addCase(getAllNotifications.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(getAllNotifications.fulfilled, (state, action) => {
                state.allNotifications = action.payload;
                state.loading = false;
            })
            .addCase(getAllNotifications.rejected, (state, action) => {
                state.loading = false;
            })

            // delete one notification
            .addCase(deleteOneNotification.fulfilled, (state, action) => {
                state.allNotifications = action.payload;
            })
    }
});

export const { isLoading } = notificationsReducer.actions;
export default notificationsReducer;
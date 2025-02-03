import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstances } from "../../config/config";

const initState = {
    loading: false,
    allSpecialists: {},
}

// ------------------------------------------------------------ self projects ---------------------------------------------------------------------------
// get all specialists
export const getAllSpecialists = createAsyncThunk(
    'get/getAllSpecialists',
    async (obj) => {
        try {
            const res = await axiosInstances.get(`/spectialists/?page=${obj?.selectedId}&limit=${obj?.limit}&information=${obj?.information}&level=${obj?.level}`, { signal: obj?.signal });
            return res.data;
        } catch (error) {
            // console.log(error);
            if (error.name) {
                // console.log('successfully aborted');
            } else {
                // handle error
                // console.log(error);
            }
        }
    }
)

const specialistsReducer = createSlice({
    name: "specialists",
    initialState: initState,
    reducers: {
        isLoading: (state, action) => {
            state.loading = action.payload
        },
    },
    // extra reducer
    extraReducers: (builder) => {
        builder
            .addCase(getAllSpecialists.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(getAllSpecialists.fulfilled, (state, action) => {
                state.allSpecialists = action.payload;
                state.loading = false;
            })
            .addCase(getAllSpecialists.rejected, (state, action) => {
                state.loading = false;
            })
    }
});

export const { isLoading } = specialistsReducer.actions;
export default specialistsReducer;
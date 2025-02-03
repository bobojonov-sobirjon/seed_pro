import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstances } from "../../config/config";
import { getToast, getToastWarn } from "../../utils/options";

const initState = {
    loading: false,
    allSelfProjects: [],
    allFavorites: [],
    allProjects: {},
}

// ------------------------------------------------------------ self projects ---------------------------------------------------------------------------
// get self all projects
export const getSelfAllProjects = createAsyncThunk(
    'get/getSelfAllProjects',
    async (obj) => {
        try {
            const res = await axiosInstances.get(`/project/`, { signal: obj?.signal });
            return res.data;
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

// delete one self project
export const deleteOneSelfProject = createAsyncThunk(
    'delete/deleteOneSelfProject',
    async (obj, { getState }) => {
        const { item } = obj;
        const allSelfProjects = getState().projectReducer.allSelfProjects; // <-- invoke and access state object
        try {
            const res = await axiosInstances.delete(`/project/${item.id}`); //delete item
            if (res.status === 200) {
                getToast("Данные успешно удалены.");
                return allSelfProjects.filter(el => el.id !== item.id);
            } else {
                getToastWarn(res.data?.message || "Есть проблема с сервером.");
                return allSelfProjects;
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

// get favorites
export const getAllFavorites = createAsyncThunk(
    'get/getAllFavorites',
    async (obj) => {
        try {
            const res = await axiosInstances.get(`/favourite/`, { signal: obj?.signal });
            return res.data;
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

// delete one favorite
export const deleteOneFavorite = createAsyncThunk(
    'delete/deleteOneFavorite',
    async (obj, { getState }) => {
        const { item } = obj;
        const allFavorites = getState().projectReducer.allFavorites; // <-- invoke and access state object
        try {
            const res = await axiosInstances.delete(`/favourite/${item.id}/`); //delete item
            if (res.status === 200) {
                getToast("Данные успешно удалены.");
                return allFavorites.filter(el => (el.project && el.project.id !== item.id));
            } else {
                getToastWarn(res.data?.message || "Есть проблема с сервером.");
                return allFavorites;
            }
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

// get all projects
export const getAllPorjects = createAsyncThunk(
    'get/getAllPorjects',
    async (obj) => {
        try {
            const res = await axiosInstances.get(`/projects/?page=${obj?.selectedId}&limit=${obj?.limit}&komanda_position=${obj?.komanda_position}&komanda_level=${obj?.komanda_level}`, { signal: obj?.signal });
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

const projectReducer = createSlice({
    name: "projects",
    initialState: initState,
    reducers: {
        isLoading: (state, action) => {
            state.loading = action.payload
        },
        updateOneProject: (state, action) => {
            state.allProjects = action.payload;
        },
    },
    // extra reducer
    extraReducers: (builder) => {
        builder
            .addCase(getSelfAllProjects.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(getSelfAllProjects.fulfilled, (state, action) => {
                state.allSelfProjects = action.payload;
                state.loading = false;
            })
            .addCase(getSelfAllProjects.rejected, (state, action) => {
                state.loading = false;
            })

            // delete one project
            .addCase(deleteOneSelfProject.fulfilled, (state, action) => {
                state.allSelfProjects = action.payload;
            })

            // get all favorites
            .addCase(getAllFavorites.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(getAllFavorites.fulfilled, (state, action) => {
                state.allFavorites = action.payload;
                state.loading = false;
            })
            .addCase(getAllFavorites.rejected, (state, action) => {
                state.loading = false;
            })

            // delete one favorite
            .addCase(deleteOneFavorite.fulfilled, (state, action) => {
                state.allFavorites = action.payload;
            })

            // get all projects
            .addCase(getAllPorjects.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(getAllPorjects.fulfilled, (state, action) => {
                state.allProjects = action.payload;
                state.loading = false;
            })
            .addCase(getAllPorjects.rejected, (state, action) => {
                state.loading = false;
            })
    }
});

export const { isLoading, updateOneProject } = projectReducer.actions;
export default projectReducer;
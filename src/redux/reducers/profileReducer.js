import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Cookies from "universal-cookie";
import { axiosInstances } from "../../config/config";
import { getToast, getToastWarn } from "../../utils/options";
const cookies = new Cookies();
// import { axiosInstances } from "../../config/config";

const initState = {
    loading: false,
    profileData: {},
    professionalInfo: [],
    allExperience: [],
    allEducations: [],
    allCourses: [],
    allAbout: [],
}

// ----------------------------------------------------------------- profile ---------------------------------------------------------------
// get profile
export const getProfile = createAsyncThunk(
    'get/getProfile',
    async (obj) => {
        try {
            const res = await axiosInstances.get(`/profile/`, { signal: obj?.signal })
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


// ------------------------------------------------------------ professional info ---------------------------------------------------------------------------
// get professiomal information
export const getProfessioanalInformation = createAsyncThunk(
    'get/getProfessioanalInformation',
    async (obj) => {
        try {
            const res = await axiosInstances.get(`/professional/information/`, { signal: obj?.signal });
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

// delete one professional info
export const deleteOneProfessionalInfo = createAsyncThunk(
    'delete/deleteOneProfessionalInfo',
    async (obj, { getState }) => {
        const { item } = obj;
        const professionalInfo = getState().profileReducer.professionalInfo; // <-- invoke and access state object
        try {
            const res = await axiosInstances.delete(`/professional/information/${item.id}`); //delete item
            if (res.status) {
                getToast("Данные успешно удалены.");
                return professionalInfo.filter(el => el.id !== item.id);
            } else {
                getToastWarn(res.data?.message || "Есть проблема с сервером.");
                return professionalInfo;
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


// --------------------------------------------------------------- experience ------------------------------------------------------------
// get experience
export const getAllExperience = createAsyncThunk(
    'get/getAllExperience',
    async (obj) => {
        try {
            const res = await axiosInstances.get(`/experience/`, { signal: obj?.signal });
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

// delete one experience
export const deleteOneExperience = createAsyncThunk(
    'delete/deleteOneExperience',
    async (obj, { getState }) => {
        const { item } = obj;
        const allExperience = getState().profileReducer.allExperience; // <-- invoke and access state object
        try {
            const res = await axiosInstances.delete(`/experience/${item.id}`); //delete item
            if (res.status) {
                getToast("Данные успешно удалены.");
                return allExperience.filter(el => el.id !== item.id);
            } else {
                getToastWarn(res.data?.message || "Есть проблема с сервером.");
                return allExperience;
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


// --------------------------------------------------------------- education ------------------------------------------------------------
// get educations
export const getAllEducations = createAsyncThunk(
    'get/getAllEducations',
    async (obj) => {
        try {
            const res = await axiosInstances.get(`/education/`, { signal: obj?.signal });
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

// delete one education
export const deleteOneEducation = createAsyncThunk(
    'delete/deleteOneEducation',
    async (obj, { getState }) => {
        const { item } = obj;
        const allEducations = getState().profileReducer.allEducations; // <-- invoke and access state object
        try {
            const res = await axiosInstances.delete(`/education/${item.id}`); //delete item
            if (res.status) {
                getToast("Данные успешно удалены.");
                return allEducations.filter(el => el.id !== item.id);
            } else {
                getToastWarn(res.data?.message || "Есть проблема с сервером.");
                return allEducations;
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

// --------------------------------------------------------------- course ------------------------------------------------------------
// get all courses
export const getAllCourses = createAsyncThunk(
    'get/getAllCourses',
    async (obj) => {
        try {
            const res = await axiosInstances.get(`/course/`, { signal: obj?.signal });
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

// delete one course
export const deleteOneCourse = createAsyncThunk(
    'delete/deleteOneCourse',
    async (obj, { getState }) => {
        const { item } = obj;
        const allCourses = getState().profileReducer.allCourses; // <-- invoke and access state object
        try {
            const res = await axiosInstances.delete(`/course/${item.id}`); //delete item
            if (res.status) {
                getToast("Данные успешно удалены.");
                return allCourses.filter(el => el.id !== item.id);
            } else {
                getToastWarn(res.data?.message || "Есть проблема с сервером.");
                return allCourses;
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

// --------------------------------------------------------------- about (content) ------------------------------------------------------------
// get all about
export const getAllAbout = createAsyncThunk(
    'get/getAllAbout',
    async (obj) => {
        try {
            const res = await axiosInstances.get(`/about/`, { signal: obj?.signal });
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

// delete one about
export const deleteOneAbout = createAsyncThunk(
    'delete/deleteOneAbout',
    async (obj, { getState }) => {
        const { item } = obj;
        const allAbout = getState().profileReducer.allAbout; // <-- invoke and access state object
        try {
            const res = await axiosInstances.delete(`/about/${item.id}`); //delete item
            if (res.status) {
                getToast("Данные успешно удалены.");
                return allAbout.filter(el => el.id !== item.id);
            } else {
                getToastWarn(res.data?.message || "Есть проблема с сервером.");
                return allAbout;
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


const profileReducer = createSlice({
    name: "profile",
    initialState: initState,
    reducers: {
        isLoading: (state, action) => {
            state.loading = action.payload
        },
    },
    // extra reducer
    extraReducers: (builder) => {
        builder
            // get profile
            .addCase(getProfile.pending, (state, action) => {
                state.loading = false;
            })
            .addCase(getProfile.fulfilled, (state, action) => {
                state.profileData = action.payload;
                state.loading = false;
            })
            .addCase(getProfile.rejected, (state, action) => {
                state.loading = false;
            })

            // get professional information
            .addCase(getProfessioanalInformation.fulfilled, (state, action) => {
                state.professionalInfo = action.payload;
            })
            .addCase(deleteOneProfessionalInfo.fulfilled, (state, action) => {
                state.professionalInfo = action.payload;
            })

            // get experience
            .addCase(getAllExperience.fulfilled, (state, action) => {
                state.allExperience = action.payload;
            })
            .addCase(deleteOneExperience.fulfilled, (state, action) => {
                state.allExperience = action.payload;
            })

            // get educations
            .addCase(getAllEducations.fulfilled, (state, action) => {
                state.allEducations = action.payload;
            })
            .addCase(deleteOneEducation.fulfilled, (state, action) => {
                state.allEducations = action.payload;
            })

            // get courses
            .addCase(getAllCourses.fulfilled, (state, action) => {
                state.allCourses = action.payload;
            })
            .addCase(deleteOneCourse.fulfilled, (state, action) => {
                state.allCourses = action.payload;
            })

            // get about
            .addCase(getAllAbout.fulfilled, (state, action) => {
                state.allAbout = action.payload;
            })
            .addCase(deleteOneAbout.fulfilled, (state, action) => {
                state.allAbout = action.payload;
            })
    }
});


export const { onSwitch, onLogin, onExit, isLoading } = profileReducer.actions;
export default profileReducer;
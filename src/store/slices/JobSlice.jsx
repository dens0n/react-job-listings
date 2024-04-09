import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    jobs: [],
    search: "",
    municipality: "",
};

export const jobsSlice = createSlice({
    name: "jobs",
    initialState,
    reducers: {
        setReduxJobs: (state, action) => {
            state.jobs = action.payload;
        },
        reduxSearch: (state, action) => {
            state.search = action.payload;
        },
        setReduxMunicipality: (state, action) => {
            state.municipality = action.payload;
        },
    },
});

export const { setReduxJobs, reduxSearch, setReduxMunicipality } =
    jobsSlice.actions;

/* export const selectJobs = (state) => state.jobs.jobs; */

export default jobsSlice.reducer;

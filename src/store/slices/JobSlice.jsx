import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    jobs: [],
    search: "",
};

export const jobsSlice = createSlice({
    name: "jobs",
    initialState,
    reducers: {
        setJobs: (state, action) => {
            state.jobs = action.payload;
        },
        reduxSearch: (state, action) => {
            state.search = action.payload;
        },
    },
});

export const { setJobs, reduxSearch } = jobsSlice.actions;

export const selectJobs = (state) => state.jobs.jobs;

export default jobsSlice.reducer;

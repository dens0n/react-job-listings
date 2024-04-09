import { configureStore } from "@reduxjs/toolkit";
import jobsReducer from "./slices/JobSlice";

export const store = configureStore({
    reducer: {
        jobs: jobsReducer,
    },
});

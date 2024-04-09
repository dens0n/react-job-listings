import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    jobs: [],
    search: "",
    municipality: "",
    employmentTypeFilter: "", // Lägg till en ny variabel för att spara filtreringsstatusen för heltid, deltid eller alla jobb
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
        setEmploymentTypeFilter: (state, action) => {
            // Skapa en ny reducer för att uppdatera filtreringsstatusen för heltid, deltid eller alla jobb
            state.employmentTypeFilter = action.payload;
        },
        sortJobsByEmploymentType: (state) => {
            switch (state.employmentTypeFilter) {
                case "heltid":
                    state.jobs.sort((a, b) => {
                        if (
                            !a.working_hours_type.label &&
                            !b.working_hours_type.label
                        ) {
                            return 0; // Behåll ursprunglig ordning om båda är null
                        }
                        if (!a.working_hours_type.label) {
                            return 1; // Flytta jobb med null till slutet av listan
                        }
                        if (!b.working_hours_type.label) {
                            return -1; // Flytta jobb med null till slutet av listan
                        }
                        return b.working_hours_type.label.localeCompare(
                            a.working_hours_type.label
                        );
                    });
                    break;
                case "deltid":
                    state.jobs.sort((a, b) => {
                        if (
                            !a.working_hours_type.label &&
                            !b.working_hours_type.label
                        ) {
                            return 0; // Behåll ursprunglig ordning om båda är null
                        }
                        if (!a.working_hours_type.label) {
                            return 1; // Flytta jobb med null till slutet av listan
                        }
                        if (!b.working_hours_type.label) {
                            return -1; // Flytta jobb med null till slutet av listan
                        }
                        return a.working_hours_type.label.localeCompare(
                            b.working_hours_type.label
                        );
                    });
                    break;
                default:
                    // Inga specifika sorteringar, behåll ursprunglig ordning
                    break;
            }
        },
    },
});

export const {
    setReduxJobs,
    reduxSearch,
    setReduxMunicipality,
    setEmploymentTypeFilter,
    sortJobsByEmploymentType,
} = jobsSlice.actions;

export default jobsSlice.reducer;

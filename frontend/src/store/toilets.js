import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";

const slice = createSlice({
    name: "toilets",
    initialState: {
        toilets: { },
        buildings: []
    },
    reducers: {
        buildingsAdded: (toilets, action) => {
            toilets.buildings = action.payload;
        }
    }
});

const {
    buildingsAdded
} = slice.actions;

export default slice.reducer;

export const addBuildings = (buildings) => buildingsAdded(buildings);

export const getBuildings = createSelector(
    state => state.toilets,
    toilets => toilets.buildings
);
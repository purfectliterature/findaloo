import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";

const initialState = {
    name: "",
    profilePicture: "",
    email: "",
    authToken: "",
    refreshToken: "",
    points: 0,
    lastLocation: null
};

const slice = createSlice({
    name: "user",
    initialState,
    reducers: {
        tokensSet: (user, action) => {
            user.authToken = action.payload.accessToken;
            user.refreshToken = action.payload.refreshToken;
        },

        userInfoSet: (user, action) => {
            user.name = action.payload.name;
            user.profilePicture = action.payload.profilePicture;
            user.email = action.payload.email;
            user.points = action.payload.points;
        },

        locationSaved: (user, action) => {
            user.lastLocation = action.payload;
        },

        reset: (user, action) => {
            user = initialState;
        },
    },
});

const {
    tokensSet,
    userInfoSet,
    locationSaved,
    reset
} = slice.actions;

export default slice.reducer;

export const setTokens = (tokens) => tokensSet(tokens);
export const setUserInfo = (userInfo) => userInfoSet(userInfo);
export const saveLocation = (lat, lng) => locationSaved({ lat, lng });
export const resetUserState = () => reset();

export const getTokens = createSelector(
    (state) => state.user,
    ({ authToken, refreshToken }) => ({ authToken, refreshToken })
);

export const getUserInfo = createSelector(
    state => state.user,
    ({ name, profilePicture, email, points }) => ({ name, profilePicture, email, points })
);

export const getLastLocation = createSelector(
    state => state.user,
    ({ lat, lng }) => ({ lat, lng })
);

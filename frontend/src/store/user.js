import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";

const initialState = {
    name: "",
    profilePicture: "",
    email: "",
    authToken: "",
    refreshToken: "",
    points: 0,
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

        reset: (user, action) => {
            user = initialState;
        },
    },
});

const { tokensSet, userInfoSet, reset } = slice.actions;

export default slice.reducer;

export const setTokens = (tokens) => tokensSet(tokens);
export const setUserInfo = (userInfo) => userInfoSet(userInfo);
export const resetUserState = () => reset();

export const getTokens = createSelector(
    (state) => state.user,
    ({ authToken, refreshToken }) => ({ authToken, refreshToken })
);

export const getUserInfo = createSelector(
    (state) => state.user,
    ({ name, profilePicture, email, points }) => ({
        name,
        profilePicture,
        email,
        points,
    })
);

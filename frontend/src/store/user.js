import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import Routes from '../utils/routes';

const initialState = {
    name: "",
    profilePicture: "",
    email: "",
    authToken: "",
    refreshToken: "",
    points: 0,
    lastLocation: null,
    newPasswordRequest: {},
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
        addNewPasswordRequest: {
            reducer(state, action) {
                state.newPasswordRequest["new"] = action.payload.newPassword;
                state.newPasswordRequest["current"] = action.payload.currentPassword;
            },
            prepare(authToken, currentPassword, newPassword) {
                return {
                    payload: { currentPassword, newPassword },
                    meta: {
                        offline: {
                            effect: {
                                url: `${Routes.updatePassword}`,
                                method: 'PUT',
                                body: JSON.stringify({
                                    newPassword
                                }),
                                headers: {
                                    'Content-Type': 'application/json',
                                    Authorization: `Bearer ${authToken}`,
                                },
                            },
                            commit: { type: 'user/clearNewPasswordRequest' },
                        },
                    },
                };
            },
        },
        clearNewPasswordRequest: (state, action) => {
            state.newPasswordRequest = {}
        }
    },
});

const {
    tokensSet,
    userInfoSet,
    locationSaved,
    reset,
} = slice.actions;

export const {
    addNewPasswordRequest,
    clearNewPasswordRequest,
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
    ({ lastLocation }) => lastLocation
);

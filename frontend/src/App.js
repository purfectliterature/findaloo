import React, { useEffect } from "react";
import { App, View } from "framework7-react";
import ReactGA from "react-ga";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import "./App.css";

import Details from "./pages/Details";
import CreateReviews from "./pages/CreateReview";
import CreateReport from "./pages/CreateReport";
import Explore from "./pages/Explore";
import LoginPage from "./pages/LoginRegister/Login";
import RegisterPage from "./pages/LoginRegister/Register";
import Profile from "./pages/Profile";
import EditProfile from "./pages/EditProfile";
import ChangePassword from "./pages/ChangePassword";
import Rewards from "./pages/Rewards";
import ManageReviews from "./pages/ManageReviews";
import GoogleLoginPage from "./pages/GoogleLogin";
import FetchLoading from "./components/FetchLoading";
import Buildings from "./pages/Buildings";

import { store, persistor } from "./store/configureStore";

const trackingId = "UA-178628413-1";
ReactGA.initialize(trackingId);

const f7params = {
    root: "#app", // App root element
    id: "io.framework7.testapp", // App bundle ID
    name: "Framework7", // App name
    theme: "auto", // Automatic theme detection,
    // App routes
    routes: [
        {
            path: "/",
            component: Explore,
        },
        {
            path: "/toilets/:id/",
            component: Details,
        },
        {
            path: "/reviews/create/",
            component: CreateReviews,
        },
        {
            path: "/login/",
            component: LoginPage,
        },
        {
            path: "/register/",
            component: RegisterPage,
        },
        {
            path: "/reports/create/",
            component: CreateReport,
        },
        {
            path: "/profile/",
            component: Profile,
        },
        {
            path: "/edit-profile/",
            component: EditProfile,
        },
        {
            path: "/change-password/",
            component: ChangePassword,
        },
        {
            path: "/rewards/",
            component: Rewards,
        },
        {
            path: "/manage-reviews/",
            component: ManageReviews,
        },
        {
            path: "/google-login",
            component: GoogleLoginPage,
        },
        {
            path: "/buildings/",
            component: Buildings,
        },
    ],
};

export default (props) => {
    return (
        <Provider store={store}>
            <PersistGate loading={<FetchLoading />} persistor={persistor}>
                <App params={f7params}>
                    <View main url="/" pushState={true} pushStateSeparator="" />
                </App>
            </PersistGate>
        </Provider>
    );
};

import React from "react";
import { App, View } from "framework7-react";
import "./App.css";
import Details from "./pages/Details";
import CreateReviews from "./pages/CreateReview";
import LoginPage from "./pages/LoginRegister/Login";
import RegisterPage from "./pages/LoginRegister/Register";

const f7params = {
    root: "#app", // App root element
    id: "io.framework7.testapp", // App bundle ID
    name: "Framework7", // App name
    theme: "auto", // Automatic theme detection
    // App routes
    routes: [
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
    ],
};

function Main() {
    return (
        <App params={f7params}>
            <View main url="/register/" />
        </App>
    );
}

export default Main;

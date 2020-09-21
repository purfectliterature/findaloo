import React, { useEffect } from "react";
import { App, View } from "framework7-react";
import "./App.css";

import Details from "./pages/Details";
import CreateReviews from "./pages/CreateReview";
import Explore from "./pages/Explore";
import ListPage from "./pages/ListPage/index.js";
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
            path: "/list/",
            component: ListPage,
        },
    ],
};

export default (props) => {
    useEffect(() => {
        let viewport = document.querySelector("meta[name=viewport]");
        viewport.setAttribute(
            "content",
            "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
        );
        const initialHeight = window.innerHeight;

        window.onresize = () => {
            const metaViewport = document.querySelector("meta[name=viewport]");

            if (window.innerHeight < initialHeight) {
                document.documentElement.style.setProperty("overflow", "auto");
                metaViewport.setAttribute(
                    "content",
                    `height=${initialHeight}px, width=device-width, initial-scale=1.0`
                );
            } else {
                document.documentElement.style.setProperty(
                    "overflow",
                    "hidden"
                );
                viewport.setAttribute(
                    "content",
                    "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
                );
            }
        };
    }, []);

    return (
        <App params={f7params}>
            <View main url="/register/" />
        </App>
    );
};

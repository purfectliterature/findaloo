import React, { useEffect } from 'react';
import { App } from 'framework7-react';
import './App.css';

import Explore from "./pages/Explore";

export default (props) => {
    useEffect(() => {
        let viewport = document.querySelector("meta[name=viewport]");
        viewport.setAttribute("content", "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0");
        const initialHeight = window.innerHeight;

        window.onresize = () => {
            const metaViewport = document.querySelector("meta[name=viewport]");

            if (window.innerHeight < initialHeight) {
                document.documentElement.style.setProperty("overflow", "auto");
                metaViewport.setAttribute("content", `height=${initialHeight}px, width=device-width, initial-scale=1.0`);
            } else {
                document.documentElement.style.setProperty("overflow", "hidden");
                viewport.setAttribute("content", "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0");
            }
        }
    }, []);

    return (
        <App>
            <Explore />
        </App>
    );
}
import React from 'react';
import { App } from 'framework7-react';
import './App.css';

import Explore from "./pages/Explore";

export default (props) => {
    return (
        <App>
            <Explore />
        </App>
    );
}
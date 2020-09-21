import React from 'react';
import ReactDOM from 'react-dom';
import Framework7 from 'framework7/framework7.esm.bundle';
import Framework7React from 'framework7-react';
import 'framework7/css/framework7.bundle.min.css';
import 'framework7-icons/css/framework7-icons.css';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

Framework7.use(Framework7React);

ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
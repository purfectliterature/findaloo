import React from 'react';
import "./styles.css";

export default (props) => {
    return (
        <div className="toil-card">
            {props.children}
        </div>
    );
}
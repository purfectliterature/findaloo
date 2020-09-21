import React from 'react';
import "./styles.css";

export default (props) => {
    const {
        title,
        onClick
    } = props;

    return (
        <div className="bldg-card" onClick={onClick}>
            <h3>{title}</h3>
        </div>
    )
}
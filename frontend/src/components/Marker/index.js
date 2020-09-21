import React from 'react';
import "./styles.css";

export const MyLocationMarker = (props) => <div onClick={() => alert(props.text)} className="marker-my-location" />;

export default ({ title, onClick, active }) => (
    <div onClick={onClick} className={`marker-toilet ${active ? "active" : ""}`}>
        <img alt={`${title} marker`} src={require("../../assets/marker-toilet.svg")} />
        <p>{title}</p>
    </div>
);
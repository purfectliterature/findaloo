import React from "react";
import "./Button.css";

export default (props) => {
    const {
        caption,
        color,
        onClick,
        url,
        icon,
        type,
        theme
    } = props;

    if (url) {
        return (
            <a href={url || "#"} target="_blank" rel="noopener noreferrer" className="anchor-button-container">
                <button className="px-button" style={{ backgroundColor: color }} type={type}>
                    {caption}
                    {icon || null}
                </button>
            </a>
        )
    } else {
        return (
            <button className={`px-button ${theme ? theme : ""}`} style={{ backgroundColor: color }} type={type} onClick={onClick || (() => {})}>
                {caption}
                {icon || null}
            </button>
        );
    }
}
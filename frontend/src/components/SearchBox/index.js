import React, { useState } from 'react';
import SearchIcon from '@material-ui/icons/Search';
import { Button } from "framework7-react";
import "./styles.css";

export default (props) => {
    const {
        mode,
        onChange,
        onFocus,
        value,
        loggedIn,
        onClickProfilePicture,
        onClickLogInButton
    } = props;

    const [appendedClasses, setAppendedClasses] = useState("");

    const renderRightFragment = () => {
        if (loggedIn) {
            return (
                <div
                    onClick={onClickProfilePicture}
                    className="ripple"
                    style={{height:"2.5rem",
                        width:"2.5rem",
                        backgroundColor: "red",
                        borderRadius: "50%",
                        display: "inline-block",
                        flexShrink: 0
                    }} 
                />
            );
        } else {
            return <Button fill onClick={onClickLogInButton} className="sb-button">Log in</Button>;
        }
    }

    return (
        <div className={`searchbox ${mode || ""} ${appendedClasses}`}>
            <SearchIcon />

            <input
                id={"search"}
                name={"text"}
                type={"search"}
                className="searchbox-field"
                placeholder="Search anything here"
                onChange={(event) => onChange(event.target.value)}
                onFocus={() => {
                    setAppendedClasses("active");
                    if (onFocus) onFocus();
                }}
                onBlur={() => setAppendedClasses(value !== "" ? "filled" : "")}
                autoComplete="off"
            />

            {renderRightFragment()}
        </div>
    )
}
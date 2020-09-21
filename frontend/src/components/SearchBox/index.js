import React, { useState } from 'react';
import SearchIcon from '@material-ui/icons/Search';
import "./styles.css";

import Button from '../Button';

export default (props) => {
    const {
        mode,
        onChange,
        onFocus,
        value,
        loggedIn,
        rightButtonOnClick
    } = props;

    const [appendedClasses, setAppendedClasses] = useState("");

    const renderRightFragment = () => {
        if (loggedIn) {
            return (
                <div style={{height:"2.5rem",
                    width:"2.5rem",
                    backgroundColor: "red",
                    borderRadius: "50%",
                    display: "inline-block",
                    flexShrink: 0
                }} />
            );
        } else {
            return <Button caption="Log in" onClick={rightButtonOnClick} />;
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
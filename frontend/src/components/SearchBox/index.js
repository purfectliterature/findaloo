import React, { useState } from 'react';
import SearchIcon from '@material-ui/icons/Search';
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { Button } from "framework7-react";
import "./styles.css";

export default (props) => {
    const {
        mode,
        handleSearch,
        onFocus,
        value,
        loggedIn,
        onClickProfilePicture,
        onClickLogInButton,
        onClickBackButton,
        profilePicture,
        searching
    } = props;

    const [appendedClasses, setAppendedClasses] = useState("");
    const [searchKeywords, setSearchKeywords] = useState("");
    const [searchWaiting, setSearchWaiting] = useState(null);

    const handleKeywords = ({ target: { value }}) => {
        setSearchKeywords(value);
        if (searchWaiting) clearTimeout(searchWaiting);
        setSearchWaiting(setTimeout(() => {
            setSearchWaiting(null);
            handleSearch(value)
        }, 200));
    }

    const renderRightFragment = () => {
        if (loggedIn) {
            return (
                <div
                    onClick={onClickProfilePicture}
                    className="sb-profile-picture ripple"
                    style={{
                        background: `url("${profilePicture}"), #828282`,
                        backgroundRepeat: "no-repeat",
                        backgroundSize: "cover"
                    }}
                />
            );
        } else {
            return <Button fill onClick={onClickLogInButton} className="sb-button">Log in</Button>;
        }
    }

    return (
        <div className={`searchbox ${mode || ""} ${appendedClasses}`}>
            {searching ? 
                <ArrowBackIcon onClick={() => {
                    setSearchKeywords("");
                    onClickBackButton();
                }} /> 
            : <SearchIcon />}

            <input
                id={"search"}
                name={"text"}
                type={"search"}
                className="searchbox-field"
                placeholder="Search all toilets here"
                onChange={handleKeywords}
                onFocus={() => {
                    setAppendedClasses("active");
                    if (onFocus) onFocus();
                }}
                value={searchKeywords}
                onBlur={() => setAppendedClasses(value !== "" ? "filled" : "")}
                autoComplete="off"
            />

            {searching ? null : renderRightFragment()}
        </div>
    )
}
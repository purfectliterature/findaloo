import React from "react";
import "./SearchBar.css";
import SearchIcon from "@material-ui/icons/Search";
import Avatar from "../Avatar/Avatar.js";

class SearchBar extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="searchBar">
                <SearchIcon className="searchIcon"></SearchIcon>
                <input
                    className="searchInput"
                    placeholder="Search anything here"
                ></input>
                <Avatar image="https://desktoplux.com/wallpapers/2000/1328/800x500.jpg"></Avatar>
            </div>
        );
    }
}

export default SearchBar;

import React from "react";
import "./styles.css";
import SearchIcon from "@material-ui/icons/Search";
import Avatar from "../Avatar/index.js";

class SearchBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchKeyword: "",
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);
    }

    handleChange(e) {
        var value = e.target.value;
        this.setState({
            searchKeyword: value,
        });
        this.props.onChange(e);
    }

    handleKeyDown(e) {
        if (e.keyCode === 13) {
            this.props.onSearch();
        }
    }

    render() {
        return (
            <div className="searchBar">
                <SearchIcon className="searchIcon"></SearchIcon>
                <input
                    className="searchInput"
                    placeholder="Search anything here"
                    onKeyDown={this.handleKeyDown}
                    value={this.state.searchKeyword}
                    onChange={this.handleChange}
                ></input>
                <Avatar image="https://desktoplux.com/wallpapers/2000/1328/800x500.jpg"></Avatar>
            </div>
        );
    }
}

export default SearchBar;

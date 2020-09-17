import React from "react";
import "./FloatButton.css";

class SearchBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: this.props.text,
            icon: this.props.icon,
        };
    }

    render() {
        return (
            <button className="float btn-style">
                <span className="button-icon">{this.state.icon}</span>
                <span className="button-text">{this.state.text}</span>
            </button>
        );
    }
}

export default SearchBar;

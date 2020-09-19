import React from "react";
import "./FloatButton.css";
import { Button } from "framework7-react";

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
            <Button raised round className="float btn-style">
                {this.state.icon}
                <span className="button-text">{this.state.text}</span>
            </Button>
        );
    }
}

export default SearchBar;

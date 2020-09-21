import React from "react";
import "./styles.css";

class Avatar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            image: props.image,
        };
    }

    render() {
        return (
            <img src={this.state.image} alt="Avatar" className="avatar"></img>
        );
    }
}

export default Avatar;

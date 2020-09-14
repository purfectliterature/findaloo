import React from "react";
import "./Avatar.css";

class Avatar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      image: props.image,
    };
  }

  render() {
    return (
      <div className="avatar">
        <img src={this.state.image} alt="Avatar" class="avatar"></img>
      </div>
    );
  }
}

export default Avatar;

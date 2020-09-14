import React from "react";
import "./Card.css";

class Card extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      toilet: props.toilet,
    };
  }

  render() {
    return (
      <div className="card">
        <img
          src={this.state.toilet.image}
          alt="toilet-image"
          className="card-img"
        ></img>
        <h2 className="card-title">{this.state.toilet.name}</h2>
        <p className="card-subtitle">{this.state.toilet.distance}</p>
        <p></p>
      </div>
    );
  }
}

export default Card;

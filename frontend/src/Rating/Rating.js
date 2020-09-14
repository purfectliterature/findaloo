import React from "react";
import "./Rating.css";
import StarIcon from "@material-ui/icons/Star";

class Rating extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rating: parseFloat(props.rating),
      count: parseInt(props.count),
    };
  }

  renderStars() {
    const filledStars = Math.floor(this.state.rating);
    const emptyStarts = 5 - filledStars;
    const stars = [];
    for (let i = 0; i < filledStars; i++) {
      stars.push(<StarIcon className="star-filled"></StarIcon>);
    }
    for (let i = 0; i < emptyStarts; i++) {
      stars.push(<StarIcon className="star-empty"></StarIcon>);
    }
    return <div className="stars">{stars}</div>;
  }

  render() {
    return (
      <div className="rating-container">
        <span className="rating-text">{this.state.rating}</span>
        {this.renderStars()}
        <span className="rating-text">
          ({this.state.count.toLocaleString()})
        </span>
      </div>
    );
  }
}

export default Rating;

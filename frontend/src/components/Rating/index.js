import React from "react";
import "./styles.css";
import StarIcon from "@material-ui/icons/Star";
import StarHalfIcon from "@material-ui/icons/StarHalf";

class Rating extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            rating: parseFloat(props.rating),
            count: parseInt(props.count),
            mini: props.mini
        };
    }

    renderStars() {
        let filledStars = Math.floor(this.state.rating);
        let halfStar = 0;
        if (this.state.rating - filledStars > 0.25) {
            if (this.state.rating - filledStars < 0.75) {
                halfStar = 1;
            } else {
                filledStars++;
            }
        }

        const emptyStarts = 5 - filledStars - halfStar;
        const stars = [];
        for (let i = 0; i < filledStars; i++) {
            stars.push(<StarIcon className="star-filled" key={i}></StarIcon>);
        }
        if (halfStar > 0) {
            stars.push(
                <StarHalfIcon
                    className="star-filled"
                    key={filledStars}
                ></StarHalfIcon>
            );
        }
        for (let i = 0; i < emptyStarts; i++) {
            stars.push(
                <StarIcon
                    className="star-empty"
                    key={i + filledStars}
                ></StarIcon>
            );
        }
        return <div className="stars">{stars}</div>;
    }

    render() {
        return (
            <div className={`rating-container ${this.state.mini ? "mini" : ""}`}>
                <span className="rating-text">{Math.round(this.state.rating * 100) / 100}</span>
                {this.renderStars()}
                <span className="rating-text">
                    ({this.state.count.toLocaleString()})
                </span>
            </div>
        );
    }
}

export default Rating;

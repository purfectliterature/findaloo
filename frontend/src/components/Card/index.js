import React from "react";
import "./styles.css";
import Rating from "../Rating";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import MoneyOffIcon from "@material-ui/icons/MoneyOff";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import Feature from "../Feature";

class Card extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            toilet: props.toilet,
        };
    }

    renderMaleIcon() {
        if (this.state.toilet.hasMale) {
            return (
                <img
                    className="gender-icon"
                    src="/Male-icon.svg"
                    alt="male"
                ></img>
            );
        }
    }

    renderFemaleIcon() {
        if (this.state.toilet.hasMale) {
            return (
                <img
                    className="gender-icon"
                    src="/Female-icon.svg"
                    alt="female"
                ></img>
            );
        }
    }

    renderFeatures() {
        return (
            <div className="features">
                <Feature
                    featureName="Bidet"
                    has={this.state.toilet.hasBidet}
                    className="feature-lists"
                ></Feature>
                <Feature
                    featureName="Toilet paper"
                    has={this.state.toilet.hasToiletPaper}
                    className="feature-lists"
                ></Feature>
            </div>
        );
    }

    renderSubtitle() {
        return (
            <div className="card-subtitle">
                <span>{this.state.toilet.distance}</span>
                <FiberManualRecordIcon className="card-subtitle-dot"></FiberManualRecordIcon>
                <span>
                    {this.state.toilet.isFree ? (
                        <MoneyOffIcon className="card-subtitle-icon"></MoneyOffIcon>
                    ) : (
                        <AttachMoneyIcon className="card-subtitle-icon"></AttachMoneyIcon>
                    )}
                </span>
            </div>
        );
    }

    render() {
        return (
            <div className="card">
                <img
                    src={this.state.toilet.image}
                    alt="toilet"
                    className="card-img"
                ></img>
                <div className="gender-icon-container">
                    {this.renderMaleIcon()}
                    {this.renderFemaleIcon()}
                </div>
                <div className="card-info">
                    <h2 className="card-title">{this.state.toilet.name}</h2>
                    {this.renderSubtitle()}
                    <Rating
                        rating={this.state.toilet.review_rating}
                        count={this.state.toilet.ratingCount}
                    ></Rating>
                    {this.renderFeatures()}
                </div>
            </div>
        );
    }
}

export default Card;

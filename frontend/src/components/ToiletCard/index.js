import React from 'react';
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import MoneyOffIcon from "@material-ui/icons/MoneyOff";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import "./styles.css";

import Rating from "../Rating";
import Feature from "../Feature";

export default (props) => {
    const {
        ratingCount,
        reviewRating,
        hasBidet,
        hasToiletPaper,
        isMaleToilet,
        isFemaleToilet,
        isFree,
        distance,
        name,
        image
    } = props.toilet;

    const renderMaleIcon = () => {
        if (isMaleToilet) return (
            <img alt="male" className="gender-icon" src={require("../../assets/icon-male.svg")} />
        );
    }

    const renderFemaleIcon = () => {
        if (isFemaleToilet) return (
            <img alt="female" className="gender-icon" src={require("../../assets/icon-female.svg")} />
        );
    }

    const renderSubtitle = () => (
        <div className="card-subtitle">
            <p>{distance}</p>

            <div className="card-subtitle-dot" />

            {isFree ? <MoneyOffIcon /> : <AttachMoneyIcon />}
        </div>
    );

    const renderFeatures = () => (
        <div className="features">
            <Feature
                featureName="Bidet"
                has={hasBidet}
                className="feature-lists"
            />

            <Feature
                featureName="Bombs"
                has={hasToiletPaper}
                className="feature-lists"
            />
            
            <Feature
                featureName="Toilet paper"
                has={hasToiletPaper}
                className="feature-lists"
            />
        </div>
    );

    return (
        <div className={`toil-card ripple ${props.mini ? "mini" : ""}`}>
            <div className="card-image" style={{ backgroundImage: `url(${image})` }}>
                <div className="gender-icon-container">
                    {renderMaleIcon()}
                    {renderFemaleIcon()}
                </div>
            </div>

            <div className="card-info">
                <h3>{name}</h3>

                {renderSubtitle()}

                <Rating rating={reviewRating} count={ratingCount} mini={props.mini === true ? true : false} />

                {props.mini === true ? null : renderFeatures()}
            </div>
        </div>
    );
}
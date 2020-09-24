import React from 'react';
import MoneyOffIcon from "@material-ui/icons/MoneyOff";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import { f7 } from "framework7-react";
import "./styles.css";

import Rating from "../Rating";
import Feature from "../Feature";

export default (props) => {    
    const {
        toiletId,
        address,
        name,
        avg_review,
        review_count,
        toilet_images
    } = props.toilet;

    const {
        is_free,
        has_handheld_bidet,
        has_seat_bidet,
        has_toilet_paper,
        has_seat_cleaner,
        has_handicap,
        has_water_heater,
        has_hand_dryer,
        has_hand_soap,
        has_baby_change_station,
        has_female,
        has_male
    } = props.toilet.toilet_features;

    const {
        mini,
        onClick
    } = props;

    let image;

    try {
        image = toilet_images[0];
    } catch (error) { }

    const renderMaleIcon = () => {
        if (has_male) return (
            <img alt="male" className="gender-icon" src={require("../../assets/icon-male.svg")} />
        );
    }

    const renderFemaleIcon = () => {
        if (has_female) return (
            <img alt="female" className="gender-icon" src={require("../../assets/icon-female.svg")} />
        );
    }

    const renderSubtitle = () => (
        <div className="card-subtitle">
            {!mini ? <>
                <p>{"STRING"}</p>
                <div className="card-subtitle-dot" />
            </> : null}

            {is_free ? <MoneyOffIcon /> : <AttachMoneyIcon />}
        </div>
    );

    const renderFeatures = () => (
        <div className="features">
            <Feature
                featureName="Bidet"
                has={has_handheld_bidet}
                className="feature-lists"
            />

            <Feature
                featureName="Bombs"
                has={has_handicap}
                className="feature-lists"
            />
            
            <Feature
                featureName="Toilet paper"
                has={has_toilet_paper}
                className="feature-lists"
            />
        </div>
    );

    const openToiletDetails = () => {
        f7.views.main.router.navigate(`/toilets/${toiletId}/`);
        if (onClick) onClick();
    }

    return (
        <div className={`toil-card ripple ${mini ? "mini" : ""}`} onClick={openToiletDetails}>
            <div className="card-image" style={{
                background: `url("${image}") #828282`,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center center"
            }}>
                <div className="gender-icon-container">
                    {renderMaleIcon()}
                    {renderFemaleIcon()}
                </div>
            </div>

            <div className="card-info">
                <h3>{name}</h3>

                {renderSubtitle()}

                <Rating rating={avg_review} count={review_count} mini={mini === true ? true : false} />

                {mini === true ? null : renderFeatures()}
            </div>
        </div>
    );
}
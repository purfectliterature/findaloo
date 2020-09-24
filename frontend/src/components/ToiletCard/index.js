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

    const renderSubtitle = () => {
        let distance = parseInt(props.toilet.distance);
        if (distance >= 1000) {
            distance = (Math.round((distance / 1000) * 100) / 100) + "km";
        } else {
            distance = distance + "m";
        }

        return (
            <div className="card-subtitle">
                {!mini ? <>
                    <p>{distance}</p>
                    <div className="card-subtitle-dot" />
                </> : null}

                {is_free ? <MoneyOffIcon /> : <AttachMoneyIcon />}
            </div>
        );
    }

    const createFeature = (name, has) => (
        <Feature
            key={"ft-" + Math.floor(Math.random()*(999-100+1)+100)}
            featureName={name}
            has={has}
            className="feature-lists"
        />
    );

    const renderFeatures = () => {
        const {
            has_handheld_bidet,
            has_seat_bidet,
            has_toilet_paper,
            has_seat_cleaner,
            has_handicap,
            has_water_heater,
            has_hand_dryer,
            has_hand_soap,
            has_baby_change_station
        } = props.toilet.toilet_features;

        let featuresToRender = [];

        if (has_handheld_bidet) featuresToRender.push(createFeature("Bidet", true));
        if (has_hand_soap) featuresToRender.push(createFeature("Soap", true));
        if (has_seat_bidet) featuresToRender.push(createFeature("Seat bidet", true));
        if (has_toilet_paper) featuresToRender.push(createFeature("Toilet paper", true));
        if (has_seat_cleaner) featuresToRender.push(createFeature("Seat cleaner", true));
        if (has_handicap) featuresToRender.push(createFeature("Handicap", true));
        if (has_water_heater) featuresToRender.push(createFeature("Water heater", true));
        if (has_hand_dryer) featuresToRender.push(createFeature("Hand dryer", true));
        if (has_baby_change_station) featuresToRender.push(createFeature("Baby changing station", true));

        return <div className="features">{featuresToRender.slice(0, 3)}</div>;
    }

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
import React from 'react';
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import "./styles.css";

export default (props) => {
    const {
        title,
        onClick,
        image,
        isShowAllBuildingsButton
    } = props;

    if (isShowAllBuildingsButton) {
        return (
            <div
                className="bldg-card ripple show-all-buildings"
                onClick={onClick}
            >
                <ArrowForwardIcon />
            </div>
        );
    } else {
        return (
            <div
                className="bldg-card ripple"
                onClick={onClick}
                style={{
                    background: `
                        linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0) 40%, rgba(0,0,0,0) 40%, rgba(0,0,0,0.8) 100%),
                        url("${image}"),
                        #828282
                    `,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover"
                }}
            >
                <h3>{title}</h3>
            </div>
        );
    }
}
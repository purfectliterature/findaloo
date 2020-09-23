import React from 'react';
import "./styles.css";

export default (props) => {
    const {
        title,
        onClick,
        image
    } = props;

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
    )
}
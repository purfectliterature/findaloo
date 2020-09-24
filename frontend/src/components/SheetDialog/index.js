import React from 'react';
import { Sheet } from "framework7-react";
import "./styles.css";

export default (props) => {
    const {
        id,
        opened,
        title,
        description,
        image,
        imageAlt
    } = props;

    return (
        <Sheet
            id={id}
            className="sheet-dialog"
            swipeToClose
            opened={opened}
        >
            <div className="handle" />
            
            <img alt={imageAlt} src={image} />
            <h2>{title}</h2>
            <p>{description}</p>

            {props.children}
        </Sheet>
    )
}
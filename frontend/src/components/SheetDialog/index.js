import React from 'react';
import { Sheet } from "framework7-react";
import "./styles.css";

export default (props) => {
    const {
        id,
        opened,
        setRef,
        title,
        description,
        image,
        imageAlt,
        empty,
        className
    } = props;

    return (
        <Sheet
            id={id}
            className={`sheet-dialog ${className}`}
            swipeToClose
            opened={opened}
            {...(setRef ? { ref: setRef } : null)}
        >
            <div className="handle" />
            
            {!empty ? <>                
                <img alt={imageAlt} src={image} />
                <h2>{title}</h2>
                <p>{description}</p>
            </>: null}

            {props.children}
        </Sheet>
    )
}
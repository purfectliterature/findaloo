import React from 'react';
import { Button } from "framework7-react";
import "./styles.css";

export default (props) => {
    return (
        <Button className="fd-button" {...props}>
            {props.children}
        </Button>
    )
}
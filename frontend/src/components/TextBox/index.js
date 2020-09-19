import React, { useState } from 'react';
import "./TextBox.css";

export default (props) => {
    const {
        id,
        name,
        type,
        placeholder,
        value,
        left,
        right,
        onChange,
        onFocus,
        onBlur,
        onClick,
        mode
    } = props;

    const [appendedClasses, setAppendedClasses] = useState("");

    return (
        <div className={`textbox ${mode || ""} ${appendedClasses}`}>
            {left || null}

            <input
                id={id}
                name={name}
                type={type || "text"}
                className="textbox-field"
                placeholder={placeholder}
                onChange={(event) => onChange(event.target.value)}
                onFocus={() => {
                    setAppendedClasses("active");
                    if (onFocus) onFocus();
                }}
                onBlur={() => {
                    setAppendedClasses(value !== "" ? "filled" : "");
                    if (onBlur) onBlur();
                }}
            />

            {right || null}
        </div>
    );
}
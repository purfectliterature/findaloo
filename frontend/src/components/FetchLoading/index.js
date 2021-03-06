import React from 'react';
import PuffLoader from "react-spinners/PuffLoader";
import "./styles.css";

export default (props) => {
    return (
        <div className="fetch-loading">
            <img src={require("../../assets/logo-mark.svg")} alt="logo mark" className="logo-mark" />

            <PuffLoader
                size={120}
                loading={true}
                color="#0078FA"
            />

            <h2>Preparing toilet papers for you</h2>
        </div>
    );
}
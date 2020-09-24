import React from "react";
import { Page, f7, Col, Preloader } from "framework7-react";
import { exchangeToken, fetchUserInfo } from "../../utils/user.js";
import { useDispatch } from "react-redux";
import { setTokens, setUserInfo } from "../../store/user.js";
import "./styles.css";

export default () => {
    const dispatch = useDispatch();
    const url = window.location.href;
    var token = new URL(url).searchParams.get("code");
    token = "123";
    exchangeToken(
        { token: token },
        (data) => {
            dispatch(setTokens(data));

            fetchUserInfo(
                data.accessToken,
                (data) => {
                    dispatch(setUserInfo(data));
                },
                (error) => {}
            );
            f7.views.main.router.navigate("/");
        },
        (error) => {
            f7.views.main.router.back();
        }
    );

    return (
        <Page className="white-background-skin">
            <div className="center mt">
                <Col>
                    <Preloader color="blue"></Preloader>
                </Col>
                <h4>Coming soon...</h4>
            </div>
        </Page>
    );
};

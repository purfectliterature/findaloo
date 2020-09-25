import React, { useState } from "react";
import { Page, f7, List, ListInput } from "framework7-react";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import "../styles.css";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { setTokens, setUserInfo } from "../../../store/user.js";
import {
    login,
    getGoogleSignInUrl,
    fetchUserInfo,
} from "../../../utils/user.js";

import Button from "../../../components/BasicButton";

class LoginPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            google_login_url: "",
        };
        this.navigateToGoogleLogin = this.navigateToGoogleLogin.bind(this);
    }

    componentDidMount() {
        const that = this;
        getGoogleSignInUrl((data) => {
            that.setState({ google_login_url: data });
        });
    }

    navigateToGoogleLogin() {
        f7.views.main.router.navigate(this.state.google_login_url);
    }

    render() {
        return (
            <Page className="padding white-background-skin">
                <div className="header-group">
                    <img src={require("../../../assets/logo-mark.svg")} alt="toilet" className="logo-mark" />
                </div>

                <h1>
                    Let’s log into your account!
                </h1>

                <Form></Form>

                {/* <Button
                    outline
                    href={this.state.google_login_url}
                >
                    Sign in with Google
                </Button> */}
            </Page>
        );
    }
}

export default LoginPage;

const validate = (values) => {
    const errors = {};
    if (!values.email) {
        errors.email = "Required";
    } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    ) {
        errors.email = "Invalid email address";
    }

    if (!values.password) {
        errors.password = "Required";
    }

    return errors;
};

const Form = () => {
    const dispatch = useDispatch();
    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validate,
        onSubmit: (values, { setFieldError }) => {
            login(
                {
                    email: values.email,
                    password: values.password,
                },
                (data) => {
                    f7.views.main.router.navigate("/");
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
                    if (error.response.status === 401) {
                        setFieldError("password", "Incorrect password");
                    } else if (error.response.status === 404) {
                        setFieldError("email", "No such user found.");
                    }
                }
            );
        },
    });

    const [visible, setVisible] = useState(false);

    const toggleVisibility = () => {
        setVisible(!visible);
    };

    return (
        <form onSubmit={formik.handleSubmit}>
            <List noHairlines className="login-form">
                <ListInput
                    outline
                    label="Email"
                    floatingLabel
                    type="text"
                    placeholder="Email"
                    name="email"
                    validate={false}
                    onChange={formik.handleChange}
                    value={formik.values.email}
                    className="fd-textbox"
                >
                    <div slot="root-end" className="error-message">
                        {formik.errors.email}
                    </div>
                </ListInput>

                <ListInput
                    outline
                    label="Password"
                    floatingLabel
                    type={visible ? "text" : "password"}
                    placeholder="Password"
                    maxlength={20}
                    name="password"
                    onChange={formik.handleChange}
                    value={formik.values.password}
                    errorMessage={formik.errors.password}
                >
                    <span
                        slot="input"
                        className="visibility-icon"
                        onClick={toggleVisibility}
                    >
                        {!visible ? (
                            <VisibilityOffIcon></VisibilityOffIcon>
                        ) : (
                            <VisibilityIcon></VisibilityIcon>
                        )}
                    </span>
                    <div slot="root-end" className="error-message">
                        {formik.errors.password}
                    </div>
                </ListInput>
            </List>

            <div className="bottom-group">
                <Button fill type="submit">
                    Log in
                </Button>

                <Button outline href="/register/">
                    Create an account
                </Button>

                <div className="center-item">
                    <a
                        onClick={() => {
                            f7.views.main.router.back("/", { force: true });
                        }}
                        className="text-minor"
                    >
                        Continue without logging in
                    </a>
                </div>
            </div>
        </form>
    );
};

import React, { useState } from "react";
import { Page, List, ListInput, Button } from "framework7-react";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import "../styles.css";
import { useFormik } from "formik";

class LoginPage extends React.Component {
    toggleVisibility() {
        this.setState({ visible: !this.state.visible });
    }

    render() {
        return (
            <Page className="padding white-background-skin">
                <div className="header-group">
                    <img
                        src="/toilet-marker.png"
                        alt="toilet"
                        className="toilet-marker"
                    ></img>
                    <div>
                        <h4 className="header">Palo Alto</h4>
                        <h3 className="header">Lavatories System</h3>
                    </div>
                </div>

                <h1>
                    Create a new<br></br>account!
                </h1>
                <Form></Form>
            </Page>
        );
    }
}

export default LoginPage;

const validate = (values) => {
    const errors = {};
    if (!values.name) {
        errors.name = "Required";
    } else if (
        !/^[A-Z0-9a-z_]+$/i.test(values.name) ||
        values.name.length > 20
    ) {
        errors.name =
            "Name should contain alphabets, digits and _ only and at most 20 characters.";
    }

    if (!values.email) {
        errors.email = "Required";
    } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    ) {
        errors.email = "Invalid email address";
    }

    if (!values.password) {
        errors.password = "Required";
    } else if (
        !/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/i.test(
            values.password
        )
    ) {
        errors.password =
            "Password should contain at least one lowercase letter, one uppercase letter, one numeric digit, and one special character and have between 8 and 15 characters.";
    }

    return errors;
};

const Form = () => {
    const formik = useFormik({
        initialValues: {
            name: "",
            email: "",
            password: "",
        },
        validate,
        onSubmit: (values) => {
            alert(JSON.stringify(values, null, 2));
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
                    label="Name"
                    floatingLabel
                    type="text"
                    placeholder="Name"
                    name="name"
                    onChange={formik.handleChange}
                    value={formik.values.name}
                >
                    <div slot="root-end" className="error-message">
                        {formik.errors.name}
                    </div>
                </ListInput>

                <ListInput
                    outline
                    label="Email"
                    floatingLabel
                    type="email"
                    placeholder="Email"
                    name="email"
                    onChange={formik.handleChange}
                    value={formik.values.email}
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
                >
                    <span
                        slot="input"
                        className="visibility-icon"
                        onClick={toggleVisibility}
                    >
                        {visible ? (
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
                <div className="terms-text">
                    When you click on Create account, you are agreeing to App
                    Name’s <a className="terms-link">terms of service</a>.
                </div>
                <Button fill className="btn" type="submit">
                    Create account
                </Button>
                <Button outline className="btn">
                    Log in to your account
                </Button>
            </div>
        </form>
    );
};

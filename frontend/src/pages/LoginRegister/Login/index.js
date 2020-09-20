import React, { useState } from "react";
import { Page, List, ListInput, Button } from "framework7-react";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import "../style.css";
import { useFormik } from "formik";

class LoginPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
        };
    }
    render() {
        return (
            <Page className="white-background-skin">
                <div className="header-group">
                    <img
                        src="toilet-marker.png"
                        alt="toilet"
                        className="toilet-marker"
                    ></img>
                    <div>
                        <h4 className="header">Palo Alto</h4>
                        <h3 className="header">Lavatories System</h3>
                    </div>
                </div>

                <h1>
                    Let’s log into<br></br> your account!
                </h1>

                <Form></Form>
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
    const formik = useFormik({
        initialValues: {
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
                    label="Email"
                    floatingLabel
                    type="text"
                    placeholder="Email"
                    name="email"
                    validate={false}
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
                    errorMessage={formik.errors.password}
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
                <div className="form-link">
                    <a href="#">Having trouble signing in?</a>
                </div>
            </List>

            <div className="bottom-group">
                <Button fill className="btn" type="submit">
                    Log in
                </Button>
                <Button outline className="btn">
                    Create an account
                </Button>
            </div>
        </form>
    );
};

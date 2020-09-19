import React from "react";
import { Page, List, ListInput, Button } from "framework7-react";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import "./style.css";

class LoginPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
        };
        this.toggleVisibility = this.toggleVisibility.bind(this);
    }

    toggleVisibility() {
        this.setState({ visible: !this.state.visible });
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

                <h2>
                    Let’s log into<br></br> your account!
                </h2>

                <List noHairlines className="login-form">
                    <ListInput
                        outline
                        label="Email"
                        floatingLabel
                        type="email"
                        placeholder="Email"
                    ></ListInput>

                    <ListInput
                        outline
                        label="Password"
                        floatingLabel
                        type={this.state.visible ? "text" : "password"}
                        placeholder="Password"
                        maxlength={20}
                    >
                        <span
                            slot="input"
                            className="visibility-icon"
                            onClick={this.toggleVisibility}
                        >
                            {this.state.visible ? (
                                <VisibilityOffIcon></VisibilityOffIcon>
                            ) : (
                                <VisibilityIcon></VisibilityIcon>
                            )}
                        </span>
                    </ListInput>
                    <div className="form-link">
                        <a href="#">Having trouble signing in?</a>
                    </div>
                </List>

                <div className="btn-group">
                    <Button fill className="btn">
                        Log in
                    </Button>
                    <Button outline className="btn">
                        Create an account
                    </Button>
                </div>
            </Page>
        );
    }
}

export default LoginPage;

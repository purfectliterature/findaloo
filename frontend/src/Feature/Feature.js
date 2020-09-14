import React from "react";
import "./Feature.css";
import CheckIcon from "@material-ui/icons/Check";
import ClearIcon from "@material-ui/icons/Clear";

class Feature extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      featureName: props.featureName,
      has: props.has,
      className: props.className,
    };
  }

  render() {
    return (
      <div className={this.state.className}>
        {this.state.has ? (
          <CheckIcon className="icon check-icon"></CheckIcon>
        ) : (
          <ClearIcon className="icon cross-icon"></ClearIcon>
        )}
        <span
          className={this.state.has ? "has-feature-name" : "no-feature-name"}
        >
          {this.state.featureName}
        </span>
      </div>
    );
  }
}

export default Feature;

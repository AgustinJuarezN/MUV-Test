import React from "react";
import TextField from "@material-ui/core/TextField";
import PropTypes from "prop-types";
import "./InputTextField.scss";

export default function InputTextField(props) {
    return(
        <div className="field">
          <b>{props.label}</b>
          <TextField
            id="outlined-basic"
            label=""
            variant="outlined"
            name={props.name}
            className="input-info"
            value={props.value}
            onChange={e => props.handleInput(e)}
          />
        </div>
    );
}

InputTextField.propTypes = {
    label: PropTypes.string,
    value: PropTypes.string,
    handleInput: PropTypes.func,
    name: PropTypes.string
}
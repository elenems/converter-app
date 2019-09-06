import React from "react";
import TextField from "@material-ui/core/TextField";
import PropTypes from "prop-types";
function Input(props) {
  const { isDisabled, inputId, value, fieldLabel, handleChange } = props;

  return (
    <TextField
      disabled={isDisabled}
      id={inputId}
      value={value}
      label={fieldLabel}
      onChange={handleChange}
      variant="outlined"
    />
  );
}

Input.propTypes = {
  inputId: PropTypes.any.isRequired,
  handleChange: PropTypes.func.isRequired
};

Input.defaultProps = {
  isDisabled: false
};

export default React.memo(Input);

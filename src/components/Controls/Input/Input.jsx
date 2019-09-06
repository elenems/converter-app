import React from "react";
import TextField from "@material-ui/core/TextField";
export default React.memo(function Input(props) {
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
});

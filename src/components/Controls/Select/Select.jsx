import React from "react";
import MaterialSelect from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import OutlinedInput from "@material-ui/core/OutlinedInput";

export default React.memo(function Select({
  selectId,
  selectLabel,
  values,
  selectValue,
  handleChange
}) {
  const inputLabel = React.useRef(null);

  const [labelWidth, setLabelWidth] = React.useState(0);
  React.useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);
  }, []);

  return (
    <FormControl variant="outlined">
      <InputLabel ref={inputLabel} htmlFor={selectId}>
        {selectLabel}
      </InputLabel>
      <MaterialSelect
        onChange={handleChange}
        value={selectValue}
        input={
          <OutlinedInput
            labelWidth={labelWidth}
            name={selectId}
            id={selectId}
          />
        }
      >
        {values.map(value => {
          return (
            <MenuItem key={value} value={value}>
              {value}
            </MenuItem>
          );
        })}
      </MaterialSelect>
    </FormControl>
  );
});

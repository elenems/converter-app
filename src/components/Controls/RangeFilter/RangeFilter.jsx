import React from "react";
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider
} from "@material-ui/pickers";
import PropTypes from "prop-types";

function RangeFilter(props) {
  const [selectedDate, setSelectedDate] = React.useState(
    new Date(props.historyRange)
  );
  function handleDateChange(date) {
    setSelectedDate(date);
    props.historyChange(date);
  }

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <KeyboardDatePicker
        disableToolbar
        variant="inline"
        format="yyyy/MM/dd"
        margin="normal"
        id="date-picker-inline"
        label={props.label}
        value={selectedDate}
        onChange={handleDateChange}
        KeyboardButtonProps={{
          "aria-label": "change date"
        }}
      />
    </MuiPickersUtilsProvider>
  );
}

RangeFilter.propTypes = {
  historyChange: PropTypes.func.isRequired
};

export default React.memo(RangeFilter);

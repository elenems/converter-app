import React from "react";
import MaterialButton from "@material-ui/core/Button";
import { MdChevronLeft } from "react-icons/md";
import { MdChevronRight } from "react-icons/md";
import Tooltip from "@material-ui/core/Tooltip";
import "./Button.css";

export default React.memo(function Button({ handleClick }) {
  return (
    <Tooltip title="Switch currencies" placement="bottom">
      <MaterialButton onClick={handleClick} variant="contained" color="primary">
        <MdChevronLeft />
        <MdChevronRight />
      </MaterialButton>
    </Tooltip>
  );
});

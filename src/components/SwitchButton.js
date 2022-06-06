import React from "react";
import { styled } from "@mui/material/styles";
import Switch from "@mui/material/Switch";

const SwitchStyle = styled(Switch)({
  "& .MuiSwitch-switchBase": {
    "&.Mui-checked": {
      color: "#FE5454",
      "& + .MuiSwitch-track": {
        opacity: 1,
        backgroundColor: "#febbbb",
      },
    },
  },
});

const SwitchButton = ({ checked, handleChange, ...props }) => {
  return (
    <SwitchStyle
      checked={checked}
      onChange={handleChange}
      inputProps={{ "aria-label": "controlled" }}
      {...props}
    />
  );
};
export default SwitchButton;

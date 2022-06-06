import React from "react";
import { styled } from "@mui/material/styles";
import { Slider } from "@mui/material";

const DistanceSlider = styled(Slider)({
  marginTop: "60px",
  color: "#FE5454",
  "& .MuiSlider-track": {
    border: "none",
  },
  "& .MuiSlider-thumb": {
    "&:focus, &:hover, &.Mui-active, &.Mui-focusVisible": {
      boxShadow: "inherit",
    },
    "&:before": {
      display: "none",
    },
  },
  "& .MuiSlider-valueLabel": {
    lineHeight: 1.2,
    fontSize: 12,
    background: "unset",
    padding: 0,
    width: 32,
    height: 32,
    borderRadius: "50% 50% 50% 0",
    backgroundColor: "#FE5454",
    transformOrigin: "bottom left",
    transform: "translate(50%, -100%) rotate(-45deg) scale(0)",
    "&:before": { display: "none" },
    "&.MuiSlider-valueLabelOpen": {
      transform: "translate(50%, -100%) rotate(-45deg) scale(1)",
    },
    "& > *": {
      transform: "rotate(45deg)",
    },
  },
});

const CustomSlider = ({ handleChange, ...props }) => {
  return (
    <DistanceSlider
      aria-label="Always visible"
      onChange={(event) => handleChange(event)}
      valueLabelDisplay="on"
      {...props}
    />
  );
};
export default CustomSlider;

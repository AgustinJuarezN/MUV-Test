import React from "react";
import Slider from "@material-ui/core/Slider";
import PropTypes from "prop-types";
import "./Slider.scss";

export default function SliderContent(props) {
  return (
    <div className="slider-content">
        <div className="slider">
          <b>{props.label}</b>
          <Slider
            value={typeof props.value === "number" ? props.value : 0}
            onChange={props.handleSliderChange}
            aria-labelledby="input-slider"
            className="slider-style"
          />
        </div>
        <div className="slider-info">
          <div>
            <span>{props.value}</span>
          </div>
          <div>
            <span>100</span>
          </div>
        </div>
      </div>
  );
}

SliderContent.propTypes = {
    value: PropTypes.number,
    handleSliderChange: PropTypes.func,
    label: PropTypes.string
}

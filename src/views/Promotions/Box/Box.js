import React from "react";
import "./Box.scss";
import KeyboardArrowRightIcon from "@material-ui/icons/KeyboardArrowRight";
import PropTypes from "prop-types";
import Skeleton from "@material-ui/lab/Skeleton";

export default function Box(props) {
  return props.number ? (
    <div className="box" style={props.active ? {borderColor: props.color} : {borderColor: 'transparent'}}>
      <div className="title">
        <span>{props.title}</span>
      </div>
      <div className="result">
        <span style={{ color: props.color }}>{props.number}</span>
      </div>
      <div className="view" onClick={props.click}>
        <span>VER LISTA</span>
        <KeyboardArrowRightIcon/>
      </div>
    </div>
  ) : (
    <div>
      <Skeleton variant="rect" width={'100%'} height={130} />
    </div>
  );
}

Box.propTypes = {
  title: PropTypes.string,
  number: PropTypes.number,
  color: PropTypes.string,
  click: PropTypes.func,
  active: PropTypes.bool
};

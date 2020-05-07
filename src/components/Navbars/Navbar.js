import React, { useEffect } from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Hidden from "@material-ui/core/Hidden";
// @material-ui/icons
import Menu from "@material-ui/icons/Menu";
// core components
import AdminNavbarLinks from "./AdminNavbarLinks.js";
import RTLNavbarLinks from "./RTLNavbarLinks.js";

import "./Navbar.scss";
import styles from "assets/jss/material-dashboard-react/components/headerStyle.js";
import { useDispatch, useSelector } from 'react-redux';
import {login} from "./../../actions/auth.action";

const useStyles = makeStyles(styles);

export default function Header(props) {
  const dispatch = useDispatch();
  const classes = useStyles();
  const { color } = props;
  const appBarClasses = classNames({
    [" " + classes[color]]: color
  });
  const state = useSelector((state) => state);
  
  useEffect(() => {
    dispatch(login({name: 'Angie', lastName: 'Test'}));
  }, []);

  return (
    <AppBar className={classes.appBar + appBarClasses}>
      <Toolbar
        className={classes.container}
        style={{ display: "flex", justifyContent: "space-between" }}
      >
        <IconButton
          color="inherit"
          onClick={props.handleToggle}
          className="toggle-mobile"
        >
          <Menu />
        </IconButton>
        <Hidden smDown implementation="css">
          {props.rtlActive ? <RTLNavbarLinks /> : <AdminNavbarLinks />}
        </Hidden>
        <Hidden mdUp implementation="css">
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={props.handleDrawerToggle}
          >
            <Menu />
          </IconButton>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
}

Header.propTypes = {
  color: PropTypes.oneOf(["primary", "info", "success", "warning", "danger"]),
  rtlActive: PropTypes.bool,
  handleDrawerToggle: PropTypes.func,
  routes: PropTypes.arrayOf(PropTypes.object),
  handleToggle: PropTypes.func,
  show: PropTypes.bool
};

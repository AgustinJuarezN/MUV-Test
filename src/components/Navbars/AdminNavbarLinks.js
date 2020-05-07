import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import "./AdminNavbarLinks.scss";
import styles from "assets/jss/material-dashboard-react/components/headerLinksStyle.js";
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import { useSelector } from "react-redux";
const useStyles = makeStyles(styles);

export default function AdminNavbarLinks() {
  const classes = useStyles();
  const auth = useSelector((state) => state.auth);
  return (
    <div>
      <div className={classes.searchWrapper}>
        {
          auth.loggedIn &&
          <div className="user">
            <Avatar src="/src/assets/img/user-placeholder.png" />
            <span>{auth.user.name}</span>
            <ArrowDropDownIcon />
          </div>
        }
      </div>
    </div>
  );
}

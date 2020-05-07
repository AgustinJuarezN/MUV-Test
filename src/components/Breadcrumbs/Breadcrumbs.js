import React, { useState } from "react";
import Link from "@material-ui/core/Link";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import PropTypes from "prop-types";
import "./Breadcrumbs.scss";

export default function BreadCrumbs(props) {
  let path = window.location.pathname.split("/");

  const links = path.map(item => (
    <div key={item.toString()}>
      <Link color="inherit" href="/promociones/">
        {item}
      </Link>
    </div>
  ));

  return (
    <Breadcrumbs aria-label="breadcrumb" className="breadcrum-content">
      {links}
      <Link
        color="textPrimary"
        href="/components/breadcrumbs/"
        aria-current="page"
      >
        {props.title}
      </Link>
    </Breadcrumbs>
  );
}

BreadCrumbs.propTypes = {
  title: PropTypes.string
};

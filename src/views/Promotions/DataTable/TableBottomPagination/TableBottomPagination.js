import React from "react";
import PropTypes from "prop-types";
import Pagination from "@material-ui/lab/Pagination";
import "./TableBottomPagination.scss";

export default function EnhancedTableBottomPagination(props) {
  let countRows =
    props.rowsPerPage > props.count ? props.count : props.rowsPerPage;
  let countPages = Math.ceil(props.count / props.rowsPerPage);
  return (
    <div className="pagination-bottom-table">
      <div className="view-content">
        <b>
          Mostrando {countRows} de {props.count} items
        </b>
      </div>
      <div className="pages-content">
        <Pagination
          count={countPages}
          variant="outlined"
          shape="rounded"
          onChange={props.onChangePage}
        />
      </div>
    </div>
  );
}

EnhancedTableBottomPagination.propTypes = {
  count: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
  onChangePage: PropTypes.func
};

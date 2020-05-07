import React from "react";
import PropTypes from "prop-types";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import "./TableTopPagination.scss";

export default function EnhancedTableTopPagination(props) {
  let countRows =
    props.rowsPerPage > props.count ? props.count : props.rowsPerPage;
  return (
    <div className="pagination-table">
      <div className="view-content">
        <b>
          Mostrando {countRows} de {props.count} items
        </b>
      </div>
      <div className="select-content">
        Mostrar
        <FormControl variant="outlined">
          <Select
            value={props.rowsPerPage}
            onChange={props.onChangeRowsPerPage}
            label="Age"
            className="items-select"
          >
            {props.rowsPerPageOptions.map((item, key) => {
              return (
                <MenuItem value={item} key={key}>
                  {item}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>{" "}
        filas
      </div>
    </div>
  );
}

EnhancedTableTopPagination.propTypes = {
  rowsPerPageOptions: PropTypes.array.isRequired,
  count: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
  onChangeRowsPerPage: PropTypes.func
};

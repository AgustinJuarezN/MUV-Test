import React from "react";
import PropTypes from "prop-types";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Checkbox from "@material-ui/core/Checkbox";
const headCells = [
  {
    id: "id",
    numeric: true,
    disablePadding: true,
    label: "ID"
  },
  { id: "name", numeric: false, disablePadding: false, label: "NOMBRE" },
  {
    id: "discount",
    numeric: true,
    disablePadding: false,
    label: "DESCUENTO (%)"
  },
  { id: "ally", numeric: false, disablePadding: false, label: "ALIADO" },
  {
    id: "createdDate",
    numeric: false,
    disablePadding: false,
    label: "FECHA DE CREACIÓN"
  },
  {
    id: "dueDate",
    numeric: false,
    disablePadding: false,
    label: "FECHA DE VENCIMIENTO"
  },
  {
    id: "amount",
    numeric: true,
    disablePadding: false,
    label: "MONTO UTILIZADO"
  },
  {
    id: "usersCount",
    numeric: true,
    disablePadding: false,
    label: "CANTIDAD DE USUARIOS"
  },
  { id: "status", numeric: true, disablePadding: false, label: "ESTADO" }
];

export default function EnhancedTableHead(props) {
  const {
    order,
    orderBy,
    onRequestSort
  } = props;
  const createSortHandler = property => event => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map(headCell => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "default"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired
};

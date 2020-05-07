import React, { useEffect } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import EnhancedTableHead from "./TableHead/TableHead";
import EnhancedTableTopPagination from "./TableTopPagination/TableTopPagination";
import EnhancedTableBottomPagination from "./TableBottomPagination/TableBottomPagination";
import MenuActions from "./MenuActions/MenuActions";
import Skeleton from '@material-ui/lab/Skeleton';
import { useSelector } from "react-redux";
import "./DataTable.scss";

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
}

export default function EnhancedTable() {

  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("name");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState();
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const filteredPromotions = useSelector(state => state.promotion.promotions.filtered);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };
  
  useEffect(() => {
    setPage(0);
  }, [filteredPromotions]);

  const handleSelectAllClick = event => {
    if (event.target.checked) {
      const newSelecteds = filteredPromotions.map(n => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage - 1);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div>
      {filteredPromotions ? (
        <Paper style={{ padding: "20px 20px 0 20px" }}>
          <EnhancedTableTopPagination
            rowsPerPageOptions={[5, 10, 25]}
            count={filteredPromotions.length}
            rowsPerPage={rowsPerPage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
          <TableContainer>
            <Table
              className="table-promo"
              aria-labelledby="tableTitle"
              aria-label="enhanced table"
            >
              <EnhancedTableHead
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                onSelectAllClick={handleSelectAllClick}
                onRequestSort={handleRequestSort}
                rowCount={filteredPromotions.length}
              />
              <TableBody>
                {stableSort(filteredPromotions, getComparator(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => {
                    const labelId = `enhanced-table-checkbox-${index}`;

                    return (
                      <TableRow
                        onClick={event => handleClick(event, row.name)}
                        tabIndex={-1}
                        key={row.id}
                      >
                        <TableCell
                          component="th"
                          id={labelId}
                          scope="row"
                          padding="none"
                        >
                          {row.id}
                        </TableCell>
                        <TableCell align="right">{row.code}</TableCell>
                        <TableCell align="right">{row.discount}</TableCell>
                        <TableCell align="right">{row.allies.length > 0 ? row.allies.join(",") : '-'}</TableCell>
                        <TableCell align="right">{row.createdDate ? row.createdDate : '-'}</TableCell>
                        <TableCell align="right">{row.limits.date.toDate !== "" ? row.limits.date.toDate : '-'}</TableCell>
                        <TableCell align="right">{row.amount}</TableCell>
                        <TableCell align="right">{row.limits.user.emails.length}</TableCell>
                        <TableCell align="right">
                          {row.activePromo ? (
                            <div className="active-promo">ACTIVO</div>
                          ) : (
                            <div className="inactive-promo">INACTIVO</div>
                          )}
                        </TableCell>
                        <TableCell align="right">
                          <MenuActions />
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
          <EnhancedTableBottomPagination
            count={filteredPromotions.length}
            rowsPerPage={rowsPerPage}
            onChangePage={handleChangePage}
          />
        </Paper>
      ):
        <div>
          <Skeleton animation="wave" style={{height: '100px'}}/>
          <Skeleton animation="wave" />
          <Skeleton animation="wave" />
          <Skeleton animation="wave" />
          <Skeleton animation="wave" />
        </div>
    }
    </div>
  );
}

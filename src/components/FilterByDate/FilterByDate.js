import React, { useState, useEffect } from "react";
import DateFnsUtils from "@date-io/date-fns";
import "./FilterByDate.scss";
import "date-fns";
import Grid from "@material-ui/core/Grid";
import { compare } from "./../../utils/compareDates";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import Skeleton from "@material-ui/lab/Skeleton";
import { setFilteredPromotions, setFilter } from "./../../actions/promotion.action";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from "@material-ui/pickers";

export default function FilterByDate() {
  const dispatch = useDispatch();
  const allPromotions = useSelector((state) => state.promotion.promotions.all);
  const isFilter = useSelector((state) => state.promotion.filtered);
  const [fromDate, setFromDate] = useState(moment().format('MM-DD-YYYY'));
  const [toDate, setToDate] = useState(moment().format('MM-DD-YYYY'));

  useEffect(() => {
    if(!isFilter) {
      setFromDate(moment().format('MM-DD-YYYY'));
      setToDate(moment().format('MM-DD-YYYY'));
    }
  }, [isFilter])
  const handleFromDateChange = date => {
    setFromDate(moment(date).format('MM-DD-YYYY'));
  };

  const handleToDateChange = date => {
    setToDate(moment(date).format('MM-DD-YYYY'));
  };

  const filter = () => {
    const elements = document.getElementsByClassName('box');
    for(let e in elements) {
      if (elements[e].style) {
        elements[e].style.borderColor="transparent";
      }
    }
    const filtered = allPromotions.filter(p =>
      compare(fromDate,  p.limits.date.fromDate) == -1 && compare(toDate,  p.limits.date.fromDate) == 1
    );
    dispatch(setFilter());
    dispatch(setFilteredPromotions(filtered));
  }

  return (
    allPromotions ?
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Grid container justify="flex-start" className="content-labels">
        <div>
          <span>DESDE</span>
        </div>
        <div>
          <span>HASTA</span>
        </div>
      </Grid>
      <Grid container justify="space-between" className="container-filter">
        <KeyboardDatePicker
          disableToolbar
          variant="inline"
          format="MM/dd/yyyy"
          mask=""
          margin="normal"
          id="date-picker-inline"
          value={fromDate}
          className="filter"
          onChange={handleFromDateChange}
          KeyboardButtonProps={{
            "aria-label": "change date"
          }}
        />
        <KeyboardDatePicker
          disableToolbar
          variant="inline"
          format="MM/dd/yyyy"
          mask=""
          margin="normal"
          id="date-picker-inline"
          className="filter"
          value={toDate}
          onChange={handleToDateChange}
          KeyboardButtonProps={{
            "aria-label": "change date"
          }}
        />
        <div className="button-filter" onClick={filter}>
          APLICAR
        </div>
      </Grid>
    </MuiPickersUtilsProvider>
    : <Skeleton variant="rect" width={'100%'} height={50} />
  );
}

import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import InputLabel from "@material-ui/core/InputLabel";
import DateFnsUtils from "@date-io/date-fns";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import moment from "moment";
import Select from "@material-ui/core/Select";
import InputTextField from "./../../InputTextField/InputTextField";
import Grid from "@material-ui/core/Grid";
import CancelIcon from "@material-ui/icons/Cancel";
import SliderContent from "./../../Slider/Slider";
import InputChips from "./../../InputChips/InputChips";
import PropTypes from "prop-types";
import { setPromocode } from "./../../../actions/promotion.action";
import { setLimits } from "./../../../actions/limit.action";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from "@material-ui/pickers";
import "./Limits.scss";

function NewLimit(props) {
  const [type, setType] = React.useState("");
  const [show, setShow] = useState(true);
  const dispatch = useDispatch();
  const limits = useSelector(state => state.limit.limits);

  useEffect(() => {
    if (isInList()) {
      setType(isInList());
    }
  }, []);

  const handleChange = event => {
    const type = event.target.value;
    setType(type);
    let changeTypeLimits = limits.map(item =>
      item.name === props.item.name ? { ...item, type: type } : item
    );
    dispatch(setLimits(changeTypeLimits));
  };

  const isInList = () => {
    return limits.filter(item => item.name === props.item.name)[0].type;
  };

  const form = () => {
    switch (type) {
      case "date":
        return <FormDate />;
      case "user":
        return <FormUser />;
      case "trips":
        return <FormTrips />;
      case "monetary":
        return <FormMonetary />;
      case "Geolocation":
        return <FormGeolocation />;
    }
  };

  const handleClose = () => {
    let limitsNew = limits.filter(item => item.name !== props.item.name);
    dispatch(setLimits(limitsNew));
    setShow(false);
  };

  return (
    show && (
      <div className="new-limit">
        <div className="close">
          <CancelIcon onClick={handleClose} />
        </div>
        <div className="content">
          <div className="select-content">
            <FormControl variant="outlined">
              <InputLabel
                id="demo-simple-select-outlined-label"
                style={{ fontSize: "12px" }}
              >
                Tipo
              </InputLabel>
              <Select
                value={type}
                onChange={handleChange}
                label="tipo"
                className="select"
              >
                <MenuItem value="">
                  <em>-</em>
                </MenuItem>
                <MenuItem value={"date"}>Fecha y Hora</MenuItem>
                <MenuItem value={"user"}>Usuario</MenuItem>
                <MenuItem value={"trips"}>Cantidad de viajes</MenuItem>
                <MenuItem value={"monetary"}>Monetario</MenuItem>
                <MenuItem value={"Geolocation"}>Geolocalización</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div>{type && form()}</div>
        </div>
      </div>
    )
  );
}

NewLimit.propTypes = {
  item: PropTypes.object
};

export default function Limits() {
  const dispatch = useDispatch();
  const limits = useSelector(state => state.limit.limits);
  const [items, setItems] = useState([]);

  useEffect(() => {
    if (limits) {
      setItems(limits);
    }
  }, []);

  const addLimit = () => {
    const newLimit = {
      name: `limit-${items.length + 1}`
    };
    let itemsState = items;
    itemsState.push(newLimit);
    setItems([...itemsState]);
    dispatch(setLimits(itemsState));
  };
  return (
    <div className="limits-container">
      {items &&
        items.map((item, index) => {
          return <NewLimit key={index} item={item} />;
        })}
      <div className="addLimit">
        <div onClick={addLimit} className="button">
          <AddCircleOutlineIcon />
          Agregar Límite
        </div>
      </div>
    </div>
  );
}

function FormDate() {
  const [fromDate, setFromDate] = useState(moment().format("MM-DD-YYYY"));
  const [toDate, setToDate] = useState(moment().format("MM-DD-YYYY"));
  const dispatch = useDispatch();
  const promocode = useSelector(state => state.promotion.promocode);

  useEffect(() => {
    if (promocode.limits.date.fromDate !== "") {
      setFromDate(promocode.limits.date.fromDate);
    }
    if (promocode.limits.date.toDate !== "") {
      setToDate(promocode.limits.date.toDate);
    }
  }, []);

  const handleFromDateChange = date => {
    setFromDate(moment(date).format("MM-DD-YYYY"));
    let promocodeNew = promocode;
    promocodeNew.limits.date.fromDate = moment(date).format("MM-DD-YYYY");
    dispatch(setPromocode(promocodeNew));
  };

  const handleToDateChange = date => {
    setToDate(moment(date).format("MM-DD-YYYY"));
    let promocodeNew = promocode;
    promocodeNew.limits.date.toDate = moment(date).format("MM-DD-YYYY");
    dispatch(setPromocode(promocodeNew));
  };

  return (
    <div className="formDate">
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
        </Grid>
      </MuiPickersUtilsProvider>
    </div>
  );
}

function FormUser() {
  const [emails, setEmails] = useState([]);
  const dispatch = useDispatch();
  const promocode = useSelector(state => state.promotion.promocode);

  useEffect(() => {
    if (promocode.limits.user.emails) {
      setEmails(promocode.limits.user.emails);
    }
  }, []);

  const handleEmailList = list => {
    setEmails(list);
    let promocodeNew = promocode;
    promocodeNew.limits.user.emails = list;
    dispatch(setPromocode(promocodeNew));
  };
  return (
    <div className="formUser">
      <InputChips fromLimits={true} handleEmailsList={handleEmailList} />
    </div>
  );
}

function FormTrips() {
  const [quantity, setQuantity] = useState(0);
  const dispatch = useDispatch();
  const promocode = useSelector(state => state.promotion.promocode);

  useEffect(() => {
    if (promocode.limits.trips) {
      setQuantity(promocode.limits.trips);
    }
  }, []);

  const handleInputChange = event => {
    const { value } = event.target;
    setQuantity(value);
    let promocodeNew = promocode;
    promocodeNew.limits.trips = value;
    dispatch(setPromocode(promocodeNew));
  };
  return (
    <div>
      <InputTextField
        name="quantity"
        label="CANTIDAD"
        value={quantity}
        handleInput={handleInputChange}
      />
    </div>
  );
}

function FormMonetary() {
  const [monetary, setMonetary] = useState(0);
  const dispatch = useDispatch();
  const promocode = useSelector(state => state.promotion.promocode);

  useEffect(() => {
    if (promocode.limits.monetary) {
      setMonetary(promocode.limits.monetary);
    }
  }, []);

  const handleInputChange = event => {
    const { value } = event.target;
    setMonetary(value);
    let promocodeNew = promocode;
    promocodeNew.limits.monetary = value;
    dispatch(setPromocode(promocodeNew));
  };
  return (
    <div>
      <InputTextField
        name="monetary"
        label="GUARANIES"
        value={monetary.toString()}
        handleInput={handleInputChange}
      />
    </div>
  );
}

function FormGeolocation() {
  const [value, setValue] = useState(30);
  const [place, setPlace] = useState();
  const dispatch = useDispatch();
  const promocode = useSelector(state => state.promotion.promocode);

  useEffect(() => {
    if (promocode.limits.geolocation) {
      setPlace(promocode.limits.geolocation.place);
      setValue(promocode.limits.geolocation.radio);
    }
  }, []);

  const handleSliderChange = (event, newValue) => {
    setValue(newValue);
    let promocodeNew = promocode;
    promocodeNew.limits.geolocation.radio = newValue;
    dispatch(setPromocode(promocodeNew));
  };

  const handleInputChange = event => {
    const { value } = event.target;
    setPlace(value);
    let promocodeNew = promocode;
    promocodeNew.limits.geolocation.place = value;
    dispatch(setPromocode(promocodeNew));
  };

  return (
    <div className="formGeolocation">
      <div className="slider">
        <SliderContent
          value={value}
          handleSliderChange={handleSliderChange}
          label="RADIO EN KM"
        />
      </div>
      <div className="input">
        <InputTextField
          name="PLACE"
          label="GOOGLE MAPS"
          handleInput={handleInputChange}
          value={place}
        />
      </div>
    </div>
  );
}

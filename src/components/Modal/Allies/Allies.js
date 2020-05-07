import React, { useState, useEffect, useReducer } from "react";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import { useDispatch, useSelector } from "react-redux";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import Chip from "@material-ui/core/Chip";
import InputTextField from "./../../InputTextField/InputTextField";
import CancelIcon from "@material-ui/icons/Cancel";
import SliderContent from "./../../Slider/Slider";
import InputChips from "./../../InputChips/InputChips";
import { setAllies } from "./../../../actions/ally.action";
import { setPromocode } from "./../../../actions/promotion.action";
import { ToastsStore } from 'react-toasts';
import "./Allies.scss";

export default function Allies() {
  const dispatch = useDispatch();
  const allies = useSelector(state => state.ally.allies);
  const promocode = useSelector((state) => state.promotion.promocode);
  const [filteredAllies, setFilteredAllies] = useState();
  const [search, setSearch] = useState("");
  const [ally, setAlly] = useState([]);
  const [addAlly, setAddAlly] = useState(false);
  const [value, setValue] = useState(30);
  const [emails, setEmails] = useState([]);
  const [inputs, setInputs] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      businessName: "",
      contact: "",
      phone: "",
      ruc: "",
      address: ""
    }
  );

  useEffect(() => {
    if (promocode) {
      setAlly(promocode.allies)
    }
  }, [search, ally, allies]);

  const handleEmailList = list => {
    setEmails(list);
  };

  const handleInputChange = event => {
    const { name, value } = event.target;
    setInputs({ [name]: value });
  };

  const handleSliderChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChange = event => {
    setFilteredAllies(
      allies.filter(a =>
        event.target.value === ""
          ? []
          : a.businessName
              .toUpperCase()
              .includes(event.target.value.toUpperCase())
      )
    );
    setSearch(event.target.value);
  };

  const handleDelete = el => {
    const values = ally;
    const index = values.indexOf(el);
    if (values.length == 1) {
      setAlly(values.splice(index, 0));
    } else {
      setAlly(values.splice(index - 1, 1));
      let promocodeNew = promocode;
      promocodeNew["allies"] = values.splice(index - 1, 1);
      dispatch(setPromocode(promocodeNew));
    }
  };

  const handleClick = value => {
    const values = ally;
    if (values.includes(value)) {
      ToastsStore.info("Ya se agregó el aliado");
    } else {
      values.push(value);
      let promocodeNew = promocode;
      promocodeNew["allies"] = values;
      dispatch(setPromocode(promocodeNew));
      setAlly(values);
      setFilteredAllies([]);
    }
  };

  const submit = () => {
    if (
      inputs.businessName !== "" &&
      inputs.contact !== "" &&
      inputs.phone !== "" &&
      inputs.ruc !== "" &&
      inputs.address !== "" &&
      emails.length > 0
    ) {
      const newAlly = {...inputs,mail : emails,percentage : value};
      let newValue = allies;
      newValue.push(newAlly);
      dispatch(setAllies(newValue));
      ToastsStore.success("Se ha creado con exito");
    }
  };

  return (
    allies &&
    <div className="allies">
      <div className="content">
        {!addAlly && (
          <>
            <div className="input">
              <InputBase
                placeholder="BUSCAR ALIADOS"
                inputProps={{ "aria-label": "search google maps" }}
                value={search}
                onChange={handleChange}
              />
              <IconButton
                type="submit"
                aria-label="search"
                onClick={() => {
                  setFilteredAllies([]);
                }}
              >
                <SearchIcon />
              </IconButton>
            </div>
            <div className="search">
              <ul className="items-search">
                {filteredAllies &&
                  filteredAllies.map((item, index) => {
                    return (
                      <li
                        key={index}
                        onClick={() => handleClick(item.businessName)}
                      >
                        {item.businessName}
                      </li>
                    );
                  })}
              </ul>
            </div>
            <div className="chips-content">
              {ally.map((el, index) => {
                return (
                  <Chip
                    label={el}
                    key={index}
                    className="chip"
                    variant="outlined"
                    onDelete={() => {
                      handleDelete(el);
                    }}
                  />
                );
              })}
            </div>
          </>
        )}

        {addAlly && (
          <>
            <div className="addAllyForm">
              <div className="close">
                <CancelIcon
                  onClick={() => {
                    setAddAlly(false);
                  }}
                />
              </div>
              <div className="input-content">
                <InputTextField
                  name="businessName"
                  label="RAZÓN SOCIAL"
                  handleInput={handleInputChange}
                />
                <InputTextField
                  name="contact"
                  label="CONTACTO"
                  handleInput={handleInputChange}
                />
                <InputTextField
                  name="phone"
                  label="TELÉFONO"
                  handleInput={handleInputChange}
                />
              </div>
              <div className="input-content">
                <InputTextField
                  name="ruc"
                  label="RUC"
                  handleInput={handleInputChange}
                />
                <InputTextField
                  name="address"
                  label="DIRECCIÓN"
                  handleInput={handleInputChange}
                />
                <div className="chips-content">
                  <div>
                    <InputChips handleEmailsList={handleEmailList} />
                  </div>
                </div>
              </div>
              <div className="input-content">
                <SliderContent
                  value={value}
                  handleSliderChange={handleSliderChange}
                  label="PARTICIPACIÓN %"
                />
              </div>
              <div className="addAlly" onClick={submit}>
                <AddCircleOutlineIcon />
                Agregar aliado
              </div>
            </div>
          </>
        )}
        {!addAlly && (
          <div
            className="addAlly"
            onClick={() => setAddAlly(true)}
          >
            <AddCircleOutlineIcon />
            Agregar aliado
          </div>
        )}
      </div>
    </div>
  );
}

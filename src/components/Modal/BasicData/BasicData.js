import React, { useState, useReducer, useEffect } from "react";
import PhotoCameraIcon from "@material-ui/icons/PhotoCamera";
import Checkbox from "@material-ui/core/Checkbox";
import InputTextField from "./../../InputTextField/InputTextField";
import SliderContent from "./../../Slider/Slider";
import { useDispatch, useSelector } from "react-redux";
import { setPromocode } from "./../../../actions/promotion.action";
import "./BasicData.scss";

export default function BasicData() {
  const dispatch = useDispatch();
  const promocode = useSelector((state) => state.promotion.promocode);
  const [value, setValue] = useState(promocode.discount);
  const [multiplesTrips, setMultiplesTrips] = useState(promocode.multiplesTrips);
  const [activePromocode, setActivePromocode] = useState(promocode.activePromo);
  const [inputs, setInputs] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      code: promocode.code,
      amount: promocode.amount
    }
  );

  const handleInputChange = event => {
    const { name, value } = event.target;
    let promocodeNew = promocode;
    promocodeNew[name] = value;
    dispatch(setPromocode(promocodeNew));
    setInputs({ [name]: value });
  };

  const handleSliderChange = (event, newValue) => {
    let promocodeNew = promocode;
    promocodeNew["discount"] = newValue;
    dispatch(setPromocode(promocodeNew));
    setValue(newValue);
  };

  const handleChangeMultiples = event => {
    let promocodeNew = promocode;
    promocodeNew["multiplesTrips"] = event.target.checked;
    dispatch(setPromocode(promocodeNew));
    setMultiplesTrips(event.target.checked);
  };

  const handleChangeActive = event => {
    let promocodeNew = promocode;
    promocodeNew["activePromo"] = event.target.checked;
    dispatch(setPromocode(promocodeNew));
    setActivePromocode(event.target.checked);
  };

  return (
    <div>
      <div className="field-content">
        <InputTextField
          name="code"
          label="CODIGO"
          handleInput={handleInputChange}
          value={inputs.code}
        />
        <InputTextField
          name="amount"
          label="MONTO LIMITE POR VIAJE"
          handleInput={handleInputChange}
          value={inputs.amount}
        />
      </div>
      <SliderContent value={value} handleSliderChange={handleSliderChange} label="DESCUENTO %"/>
      <div className="button-content">
        <input
          accept="image/*"
          className="button"
          style={{ display: "none" }}
          id="raised-button-file"
          type="file"
        />
        <label htmlFor="raised-button-file">
          <div className="button" style={{ width: "45%" }}>
            <PhotoCameraIcon className="icon" /> Añadir imagen/GIF
          </div>
        </label>
      </div>
      <div className="button-content">
        <div className="button">
          <Checkbox checked={multiplesTrips} onChange={handleChangeMultiples} />
          VIAJES MULTIPLES
        </div>
        <div className="button">
          <Checkbox checked={activePromocode} onChange={handleChangeActive} />
          ACTIVAR PROMOCODE
        </div>
      </div>
    </div>
  );
}

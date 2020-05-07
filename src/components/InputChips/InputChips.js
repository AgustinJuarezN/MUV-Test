import React, { useState, useEffect } from "react";
import Chip from "@material-ui/core/Chip";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { ToastsStore } from 'react-toasts';
import "./InputChips.scss";

export default function InputChips(props) {
  const [items, setItems] = useState([]);
  const [error, setError] = useState();
  const [value, setValue] = useState("");

  const promocode = useSelector(state => state.promotion.promocode);

  useEffect(() => {
    if (props.fromLimits) {
      setItems(promocode.limits.user.emails);
    }
  }, []);

  const isValid = email => {
    let error = null;

    if (isInList(email)) {
      error = `${email} ya ha sido agregado.`;
    }

    if (!isEmail(email)) {
      error = `${email} no es una dirección de correo electrónico válida.`;
    }

    if (error) {
      setError({ error });
      ToastsStore.error(error);
      return false;
    }

    return true;
  };

  const handlePaste = evt => {
    evt.preventDefault();

    var paste = evt.clipboardData.getData("text");
    var emails = paste.match(/[\w\d.-]+@[\w\d.-]+\.[\w\d.-]+/g);

    if (emails) {
      var toBeAdded = emails.filter(email => !isInList(email));
      const itemsState = items;
      itemsState.push(toBeAdded);
      setItems(itemsState);
    }
  };

  const handleKeyDown = evt => {
    let newValue = "";
    if (evt.key === "Enter") {
      evt.preventDefault();
      if (value) {
        newValue = value.trim();
      }

      if (newValue && isValid(newValue)) {
        const itemsState = items;
        itemsState.push(value);
        props.handleEmailsList(itemsState);
        setItems(itemsState);
        setValue("");
      }
    }
  };

  const handleChange = evt => {
    setValue(evt.target.value);
    setError(null);
  };

  const handleDelete = item => {
    const itemsFiltered = items.filter(i => i !== item);
    setItems(itemsFiltered);
    props.handleEmailsList(itemsFiltered);
  };

  const isInList = email => {
    return items.includes(email);
  };

  const isEmail = email => {
    return /[\w\d.-]+@[\w\d.-]+\.[\w\d.-]+/.test(email);
  };

  return (
    <>
      <b>CORREO</b>
      <main className="wrapper">
        {items.map(email => (
          <Chip
            label={email}
            key={email}
            className="chip"
            variant="outlined"
            onDelete={() => {
              handleDelete(email);
            }}
          />
        ))}

        <input
          className="input"
          placeholder="Email"
          value={value}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          onPaste={handlePaste}
        />
      </main>
    </>
  );
}

InputChips.propTypes = {
  handleEmailsList: PropTypes.func,
  fromLimits: PropTypes.bool
}

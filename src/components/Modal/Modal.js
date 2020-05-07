import React, { useEffect, useState } from "react";
import Modal from "@material-ui/core/Modal";
import PropTypes from "prop-types";
import CloseIcon from "@material-ui/icons/Close";
import TabsWrappedLabel from "./Tabs/Tabs";
import Button from '@material-ui/core/Button';
import { useSelector, useDispatch } from "react-redux";
import { setPromotions, createdPromocode } from "./../../actions/promotion.action";
import { ToastsStore } from 'react-toasts';
import moment from "moment";
import "./Modal.scss";

const newPromocode = {
  id: "",
  code: "",
  createdDate: "",
  amount: "",
  discount: 0,
  multiplesTrips: true,
  activePromo: true,
  allies:[],
  limits: {
      date: {
          fromDate: "",
          toDate: ""
      },
      user: {
          emails: []
      },
      trips: "",
      monetary: "",
      geolocation: {
          radio: "",
          place: ""
      }
  },
  config: {
      step1: false,
      step2: false,
      step3: false
  }
};

export default function SimpleModal(props) {
  const dispatch = useDispatch();
  const promocode = useSelector(state => state.promotion.promocode);
  const [allowed, setAllowed] = useState(false);
  const allPromotions = useSelector((state) => state.promotion.promotions.all);

  useEffect(() => {
    verifyAllowed();
  })

  const verifyAllowed = () => {
    if (
      promocode.code !== "" &&
      promocode.amount !== "" &&
      promocode.discount !== 0 &&
      promocode.config.step1 &&
      promocode.config.step2 &&
      promocode.config.step3
    ) {
      setAllowed(true);
    }
  }

  const savePromocode = () => {
    let newPromotions  = allPromotions;
    promocode["id"]= allPromotions[allPromotions.length-1].id + 1;
    promocode["createdDate"] = moment().format('MM-DD-YYYY');
    newPromotions.push(promocode);
    dispatch(setPromotions(newPromotions));
    dispatch(createdPromocode(newPromocode));
    ToastsStore.success("El promocode se creó exitosamente");
  }

  const content = (
    <div className="modal-content">
      <div className="modal-header">
        <div>
          <span id="simple-modal-title">Nuevo promocode</span>
        </div>
        <div className="close">
          <CloseIcon className="icon" onClick={props.handleClose} />
        </div>
      </div>
      <div className='tabs'>
        <TabsWrappedLabel />
      </div>
      <div className="action-buttons">
          <Button className='cancel-button' onClick={props.handleClose}>Cancelar</Button>
          <Button className={`save-button ${allowed ? 'allowed-button': ''}`} disabled={!allowed} onClick={savePromocode}>Guardar</Button>
      </div>
    </div>
  );

  return (
    <div>
      <Modal
        open={props.open}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        className="modal-root"
      >
        {content}
      </Modal>
    </div>
  );
}

SimpleModal.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func
};

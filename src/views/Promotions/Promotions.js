import React, { useState } from "react";
import BreadCrumbs from "./../../components/Breadcrumbs/Breadcrumbs";
import Grid from "@material-ui/core/Grid";
import FilterByDate from "./../../components/FilterByDate/FilterByDate";
import IconButton from "@material-ui/core/IconButton";
import CachedIcon from "@material-ui/icons/Cached";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import Box from "./Box/Box";
import DataTable from "./DataTable/DataTable";
import { useSelector, useDispatch } from "react-redux";
import "./Promotions.scss";
import { setFilteredPromotions, setFilter } from "actions/promotion.action";
import SimpleModal from "./../../components/Modal/Modal";
import Skeleton from "@material-ui/lab/Skeleton";
let jsPDF = require("jspdf");
require("jspdf-autotable");

function Promotions() {
  const promotion = useSelector(state => state.promotion);
  const dispatch = useDispatch();
  const [action, setAction] = useState("all");
  const [open, setOpen] = useState(false);

  let all;
  let actives;
  let inactives;

  if (promotion.promotions.all) {
    all = promotion.promotions.all.length;
    actives = promotion.promotions.all.filter(promo => promo.activePromo)
      .length;
    inactives = promotion.promotions.all.filter(promo => !promo.activePromo)
      .length;
  }

  const exportPDF = () => {
    const unit = "pt";
    const size = "A4"; // Use A1, A2, A3 or A4
    const orientation = "portrait"; // portrait or landscape

    const marginLeft = 40;
    const doc = new jsPDF(orientation, unit, size);

    doc.setFontSize(12);

    const title = "Promocodes";
    const headers = [
      ["ID", "NOMBRE", "DESCUENTO %", "ALIADO", "FECHA DE CREACIÓN", "ESTADO"]
    ];

    const data = promotion.promotions.filtered.map(elt => [
      elt.id,
      elt.code,
      elt.discount,
      elt.allies.join(","),
      elt.createdDate,
      elt.activePromo ? "ACTIVO" : "INACTIVO"
    ]);
    let content = {
      startY: 50,
      head: headers,
      body: data
    };

    doc.text(title, marginLeft, 40);
    doc.autoTable(content);
    doc.save("report.pdf");
  };

  const handleOpen = () => {
    setOpen(!open);
  };
  const handleClickAll = () => {
    setAction("all");
    dispatch(setFilteredPromotions(promotion.promotions.all));
  };

  const handleClickActives = () => {
    setAction("actives");
    dispatch(
      setFilteredPromotions(promotion.promotions.all.filter(p => p.activePromo))
    );
  };

  const handleClickInactives = () => {
    setAction("inactives");
    dispatch(
      setFilteredPromotions(
        promotion.promotions.all.filter(p => !p.activePromo)
      )
    );
  };

  const handleSetFilter = () => {
    dispatch(setFilter());
  };

  return (
    <div>
      <Grid container spacing={3} className="top-container">
        <Grid item xs={3}>
          <BreadCrumbs title="Lista de promos" />
        </Grid>
        <Grid item xs={5}>
          <FilterByDate />
        </Grid>
        <Grid item xs={4}>
          <div className="action-buttons">
            <div>
              <IconButton aria-label="delete" onClick={handleSetFilter}>
                <CachedIcon />
              </IconButton>
            </div>
            {promotion.promotions.filtered ? (
              <div>
                <IconButton aria-label="export" onClick={() => exportPDF()} disabled={!promotion.promotions.filtered.length > 0}>
                  <CloudUploadIcon />
                  EXPORTAR
                </IconButton>
              </div>
            ) : (
              <Skeleton variant="rect" width={"50%"} height={50} />
            )}
            <div>
              <IconButton aria-label="delete" onClick={handleOpen}>
                <AddCircleOutlineIcon />
                NUEVA PROMO
              </IconButton>
              <SimpleModal open={open} handleClose={handleOpen} />
            </div>
          </div>
        </Grid>
      </Grid>
      <Grid container spacing={3} className="content-box">
        <Grid item xs={4} className="box-container">
          <Box
            title="TODOS"
            active={action === "all"}
            number={all ? all : null}
            color="#3903BA"
            click={handleClickAll}
          />
        </Grid>
        <Grid item xs={4} className="box-container">
          <Box
            title="ACTIVO"
            active={action === "actives"}
            number={actives ? actives : null}
            color="#77B103"
            click={handleClickActives}
          />
        </Grid>
        <Grid item xs={4} className="box-container">
          <Box
            title="INACTIVO"
            active={action === "inactives"}
            number={inactives ? inactives : null}
            color="#BA0638"
            click={handleClickInactives}
          />
        </Grid>
      </Grid>
      <Grid container className="table-container">
        <Grid item xs={12}>
          <DataTable />
        </Grid>
      </Grid>
    </div>
  );
}

export default Promotions;

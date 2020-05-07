import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Box from "@material-ui/core/Box";
import BasicData from "./../BasicData/BasicData";
import Allies from "./../Allies/Allies";
import Limits from "./../Limits/Limits";
import { useSelector, useDispatch } from "react-redux";
import { setPromocode } from "./../../../actions/promotion.action";
import "./Tabs.scss";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`wrapped-tabpanel-${index}`}
      aria-labelledby={`wrapped-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
};

function a11yProps(index) {
  return {
    id: `wrapped-tab-${index}`,
    "aria-controls": `wrapped-tabpanel-${index}`
  };
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper
  }
}));

export default function TabsWrappedLabel() {
  const classes = useStyles();
  const [value, setValue] = React.useState("one");
  const dispatch = useDispatch();
  const promocode = useSelector(state => state.promotion.promocode);

  useEffect(() => {
    setTab();
  }, [value]);

  const setTab = () => {
    if (value) {
      let promocodeNew = promocode;
      switch (value) {
        case "one":
          promocodeNew.config.step1 = true;
          break;
        case "two":
          promocodeNew.config.step2 = true;
          break;
        case "three":
          promocodeNew.config.step3 = true;
          break;
      }

      dispatch(setPromocode(promocodeNew));
    }
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Tabs value={value} onChange={handleChange} className="box-tabs">
          <Tab
            value="one"
            label="Datos básicos"
            wrapped
            {...a11yProps("one")}
          />
          <Tab value="two" label="Aliados" {...a11yProps("two")} />
          <Tab value="three" label="Límites" {...a11yProps("three")} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index="one">
        <BasicData />
      </TabPanel>
      <TabPanel value={value} index="two">
        <Allies />
      </TabPanel>
      <TabPanel value={value} index="three">
        <Limits />
      </TabPanel>
    </div>
  );
}

import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import { createStore } from 'redux';
import Admin from "layouts/Admin.js";
import "assets/css/material-dashboard-react.css?v=1.8.0";
import { Provider } from 'react-redux';
import { ToastsContainer, ToastsStore, ToastsContainerPosition } from 'react-toasts';
import  reducer from "./reducers";

const store = createStore(reducer);
const hist = createBrowserHistory();

ReactDOM.render(
  <Provider store={store}>
    <ToastsContainer position={ToastsContainerPosition.TOP_RIGHT} store={ToastsStore} />
    <Router history={hist}>
      <Switch>
        <Route path="/promociones" component={Admin} />
        <Redirect from="/" to="/promociones" />
      </Switch>
    </Router>
  </Provider>,
  document.getElementById("root")
);

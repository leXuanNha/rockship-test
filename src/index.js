import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createBrowserHistory } from "history";
import { Router } from "react-router-dom";
import AppRoutes from "./routers";
import ConfigureStore from "./store/configure-store";
import "bulma/css/bulma.css";

function render() {
  let history = createBrowserHistory({ basename: "/" });

  let store = ConfigureStore();

  ReactDOM.render(
    <Provider store={store}>
      <Router history={history}>
        <AppRoutes />
      </Router>
    </Provider>,
    document.getElementById("root")
  );
}

render();

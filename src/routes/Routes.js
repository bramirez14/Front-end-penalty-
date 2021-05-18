import React from "react";
import {
  BrowserRouter as Router,
  Switch,
} from "react-router-dom";

import { Login } from "../components/login/Login";
import { Register } from "../components/login/Register";
import { PrivateRoute } from "./PrivateRoute";
import { PublicRoute } from "./PublicRoute";
import { DashboardRoutes } from "./DashboardRoutes";
export const Routes = () => {

  return (
    <Router>
      <Switch>
        <PublicRoute exact path="/login" component={Login} />
        <PublicRoute exact path="/register" component={Register} />
        <PrivateRoute path="/" component={DashboardRoutes} />
      </Switch>
    </Router>
  );
};

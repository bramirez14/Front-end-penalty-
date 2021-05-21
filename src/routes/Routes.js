import React from "react";
import {
  BrowserRouter as Router,
  Switch,
} from "react-router-dom";

import { Login } from "../components/login/Login";
import { PrivateRoute } from "./PrivateRoute";
import { PublicRoute } from "./PublicRoute";
import { DashboardRoutes } from "./DashboardRoutes";
export const Routes = () => {

  return (
    <Router>
      <Switch>
        <PublicRoute exact path="/login" component={Login} />
        <PrivateRoute path="/" component={DashboardRoutes} />
      </Switch>
    </Router>
  );
};

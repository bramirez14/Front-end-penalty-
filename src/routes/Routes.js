import React from "react";
import {
  BrowserRouter as Router,
  Switch,
} from "react-router-dom";

import { Login } from "../components/login/Login";
import { Profile } from "../components/login/Profile";
import { Register } from "../components/login/Register";

import { PrivateRoute } from "./PrivateRoute";
import { PublicRoute } from "./PublicRoute";
import { DashboardRoutes } from "./DashboardRoutes";
import { PeticionJWT } from "../auth/PeticionJWT";
export const Routes = () => {
const l = PeticionJWT();

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

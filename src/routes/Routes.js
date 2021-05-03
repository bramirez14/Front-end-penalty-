import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { InputCalendario } from "../components/formularios/InputCalendario";
import { InputMsg } from "../components/formularios/InputMsg";
import { Login } from "../components/login/Login";
import { Profile } from "../components/login/Profile";
import { Register } from "../components/login/Register";

import { PrivateRoute } from "./PrivateRoute";
import { PublicRoute } from "./PublicRoute";
import { RouteAdmin } from "./RouteAdmin";
import { RouteGerente } from "./RouteGerente";
import { PerfilGerente } from "../components/perfiles/PerfilGerente";
import { DashboardRoutes } from "./DashboardRoutes";
import { Sidebar } from "../components/Sidebar/Sidebar";
import SidebarContext from "../components/context/SidebarContext";
import { PeticionJWT } from "../auth/PeticionJWT";
import { login, logout } from "../auth/localStorage";
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

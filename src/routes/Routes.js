import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Redirect,
} from "react-router-dom";
import { Input } from "../components/formularios/Input";
import { InputSelect } from "../components/formularios/InputSelect";
import { Login } from "../components/login/Login";
import { Profile } from "../components/login/Profile";
import { Register } from "../components/login/Register";
import { RendicionGastos } from "../components/rendiciones/RendicionGastos";
import { AnticipoSueldo } from "../components/subComponents/AnticipoSueldo";
import { SolicitudVacaciones } from "../components/subComponents/SolicitudVacaciones";
import { Tarea2 } from "../components/subComponents/Tarea2";
import { Tarea3 } from "../components/subComponents/Tarea3";


import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';
import { RouteAdmin } from "./RouteAdmin";
import { RouteGerente } from "./RouteGerente";

export const Routes = () => {
  return (
    <Router>
      <Switch>
        <PublicRoute exact path="/" component={ Login } />
        <PublicRoute exact path ="/register" component={Register}/>
         <RouteGerente exact path ="/anticipos/sueldos" component={ AnticipoSueldo } />
         <RouteGerente exact path ="/solicitudes/vacaciones" component={ SolicitudVacaciones }/>
         <RouteGerente exact path ='/rendicion/gastos' component = {RendicionGastos}/>
         <RouteGerente exact path ='/prueba' component = {InputSelect}/>

         <RouteAdmin exact path ="/tarea2" component={ Tarea2 }/>
         <RouteGerente  exact path ="/tarea3" component={ Tarea3 }/>
        <RouteGerente exact path ="/profile" component={Profile}/>
        <Redirect to="/" />
      </Switch>
    </Router>
  );
};
import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { Register } from '../components/login/Register'
import { PerfilGerente } from '../components/perfiles/PerfilGerente'
import { RendicionGastos } from '../components/rendiciones/RendicionGastos'
import { Sidebar } from '../components/Sidebar/Sidebar'
import { PublicRoute } from './PublicRoute';
import { RouteGerente } from './RouteGerente'
import { RouteAdmin } from "./RouteAdmin";
import { Sueldo } from '../components/solicitudes/Sueldo';
import { Vacaciones } from '../components/solicitudes/Vacaciones';
export const DashboardRoutes = ({ history }) => {



  return (
    <>
      <Sidebar />
      <div className="container mt-2">
        <Switch>
          <RouteGerente exact path="/penalty/sueldos" component={Sueldo} />
          <RouteGerente exact path="/penalty/vacaciones" component={Vacaciones} />
          <RouteGerente exact path='/penalty/gastos' component={RendicionGastos} />
          <RouteGerente exact path='/prueba' component={Sidebar} />
          <Redirect to="/penalty/sueldos" />
        </Switch>
      </div>



    </>
  )
}

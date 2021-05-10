import React from "react";
import {
  Switch,
  Redirect,
} from "react-router-dom";
import { RendicionGastos } from "../components/rendiciones/RendicionGastos";
import { Sidebar } from "../components/Sidebar/Sidebar";
import { RouteGerente } from "./RouteGerente";
import { Sueldo } from "../components/solicitudes/Sueldo";
import { Vacaciones } from "../components/solicitudes/Vacaciones";
import { PerfilCristianAdmin } from "../components/perfiles/PerfilCristianAdmin";
import { AnticipoGasto } from "../components/solicitudes/AnticipoGasto";
import { EditarRendicion } from "../components/rendiciones/EditarRendicion";
import { CrearRendicion } from "../components/rendiciones/CrearRendicion";
import { Uploads } from "../components/rendiciones/Uploads";
import { ListaRendiciones } from "../components/rendiciones/ListaRendiciones";
import { RendicionSinAnticipo } from "../components/solicitudes/RendicionSinAnticipo";

export const DashboardRoutes = ({ history }) => {

  return (
    <>
      <Sidebar />

      <Switch>
        <RouteGerente exact path="/gerencia/perfil" component={PerfilCristianAdmin}/>
        <RouteGerente   exact path="/sueldos" component={Sueldo} />
        <RouteGerente exact path="/vacaciones" component={Vacaciones} />
        <RouteGerente exact path="/gastos" component={RendicionGastos} />
        <RouteGerente exact path="/anticipo/gastos" component={AnticipoGasto} />
        <RouteGerente exact path="/editar/rendicion/:id" component={EditarRendicion}/>
        <RouteGerente exact path="/crear/rendicion/:id" component={CrearRendicion} />
        <RouteGerente exact path="/lista/rendicion/:id" component={ListaRendiciones} />
        <RouteGerente exact path="/rendicion" component={RendicionSinAnticipo} />
        <RouteGerente exact path="/img" component={Uploads} />

        <Redirect to="/login" />
      </Switch>
    </>
  );
};

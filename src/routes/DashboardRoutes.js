import React from "react";
import {
  Switch,
  Redirect,
} from "react-router-dom";
import { RendicionGastos } from "../components/rendiciones/RendicionGastos";
import { Sidebar } from "../components/Sidebar/Sidebar";
import { RouteGerente } from "./RouteGerente";
import { RouteEmpleado } from "./RouteEmpleado";

import { Sueldo } from "../components/solicitudes/Sueldo";
import { Vacaciones } from "../components/solicitudes/Vacaciones";
import { PerfilCristianAdmin } from "../components/perfiles/PerfilCristianAdmin";
import { AnticipoGasto } from "../components/solicitudes/AnticipoGasto";
import { EditarRendicion } from "../components/rendiciones/EditarRendicion";
import { CrearRendicion } from "../components/rendiciones/CrearRendicion";
import { Uploads } from "../components/rendiciones/Uploads";
import { ListaRendiciones } from "../components/rendiciones/ListaRendiciones";
import { RendicionSinAnticipo } from "../components/solicitudes/RendicionSinAnticipo";
import {  AprobacionAntcipoSueldo } from "../ComponentsGerentes/AprobacionAntcipoSueldo";
import { PerfilEmpleado } from "../components/perfiles/PerfilEmpleado";
import { Alerta } from "../components/alertas/Alerta";

export const DashboardRoutes = ({ history }) => {

  return (
    <>
      <Sidebar />

      <Switch>
        <RouteGerente exact path="/gerencia/perfil" component={PerfilCristianAdmin}/>
        <RouteGerente exact path="/aprobacion/sueldo" component={AprobacionAntcipoSueldo}/>

        <RouteEmpleado exact path="/perfil" component={PerfilEmpleado} />
        <RouteEmpleado exact path="/sueldos" component={Sueldo} />
        <RouteEmpleado exact path="/vacaciones" component={Vacaciones} />
        <RouteEmpleado exact path="/gastos" component={RendicionGastos} />
        <RouteEmpleado exact path="/anticipo/gastos" component={AnticipoGasto} />
        <RouteEmpleado exact path="/editar/rendicion/:id" component={EditarRendicion}/>
        <RouteEmpleado exact path="/crear/rendicion/:id" component={CrearRendicion} />
        <RouteEmpleado exact path="/lista/rendicion/:id" component={ListaRendiciones} />
        <RouteEmpleado exact path="/rendicion" component={RendicionSinAnticipo} />
        <RouteEmpleado exact path="/img" component={Uploads} />
        <RouteEmpleado exact path="/prueba" component={Alerta} />

        

        <Redirect to="/login" />
      </Switch>
    </>
  );
};

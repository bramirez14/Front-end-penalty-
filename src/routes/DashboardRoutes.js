import React,{useContext} from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { Register } from "../components/login/Register";
import { RendicionGastos } from "../components/rendiciones/RendicionGastos";
import { Sidebar } from "../components/Sidebar/Sidebar";
import { PublicRoute } from "./PublicRoute";
import { RouteGerente } from "./RouteGerente";
import { RouteAdmin } from "./RouteAdmin";
import { Sueldo } from "../components/solicitudes/Sueldo";
import { Vacaciones } from "../components/solicitudes/Vacaciones";
import { PerfilCristianAdmin } from "../components/perfiles/PerfilCristianAdmin";
import SidebarContext from "../components/context/SidebarContext";
import { AnticipoGasto } from "../components/solicitudes/AnticipoGasto";
import { EditarRendicion } from "../components/rendiciones/EditarRendicion";
import { CrearRendicion } from "../components/rendiciones/CrearRendicion";
import { Uploads } from "../components/rendiciones/Uploads";
import { UserContext } from "../contexto/UserContext";
import { ListaRendiciones } from "../components/rendiciones/ListaRendiciones";
import { RendicionSinAnticipo } from "../components/solicitudes/RendicionSinAnticipo";
import GeneradorPDF  from "../pdf/GeneradorPDF";
import { PDF } from "../pdf/PDF";

export const DashboardRoutes = ({ history }) => {
  const Text = useContext(UserContext);
  const { open,storage,setStorage } = Text;

  return (
    <>
      <Sidebar />

      <Switch>
        <RouteGerente
          exact
          path="/gerencia/perfil"
          component={PerfilCristianAdmin}
        />
        <RouteGerente   exact path="/sueldos" component={Sueldo} />
        <RouteGerente exact path="/vacaciones" component={Vacaciones} />
        <RouteGerente exact path="/gastos" component={RendicionGastos} />

        <RouteGerente exact path="/prueba" component={GeneradorPDF} />
        <RouteGerente exact path="/pdf" component={PDF} />

        <RouteGerente exact path="/anticipo/gastos" component={AnticipoGasto} />
        <RouteGerente
          exact
          path="/editar/rendicion/:id"
          component={EditarRendicion}
        />
        <RouteGerente exact path="/crear/rendicion/:id" component={CrearRendicion} />
        <RouteGerente exact path="/lista/rendicion/:id" component={ListaRendiciones} />
        <RouteGerente exact path="/rendicion" component={RendicionSinAnticipo} />


        <RouteGerente exact path="/img" component={Uploads} />

        <Redirect to="/login" />
      </Switch>
    </>
  );
};

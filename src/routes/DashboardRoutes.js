import React,{useContext} from "react";

import {
  Switch,
  Redirect,
} from "react-router-dom";
import { RendicionGastos } from "../components/rendiciones/RendicionGastos";
import { Sidebar } from "../components/Sidebar/Sidebar";
import { RouteGerente } from "./RouteGerente";
import { RouteEmpleado } from "./RouteEmpleado";

import { Vacaciones } from "../components/solicitudes/Vacaciones";
import { AnticipoGasto } from "../components/solicitudes/AnticipoGasto";
import { EditarRendicion } from "../components/rendiciones/EditarRendicion";
import { CrearRendicion } from "../components/rendiciones/CrearRendicion";
import { Uploads } from "../components/rendiciones/Uploads";
import { ListaRendiciones } from "../components/rendiciones/ListaRendiciones";
import { RendicionSinAnticipo } from "../components/solicitudes/RendicionSinAnticipo";
import {  AprobacionAntcipoSueldo } from "../ComponentsGerentes/AprobacionAntcipoSueldo";
import { Alerta } from "../components/alertas/Alerta";
import { Register } from "../components/login/Register";
import { Perfil } from "../components/perfiles/Perfil";
import { AprobacionVacaciones } from "../ComponentsGerentes/AprobacionVacaciones";
import { UserContext } from "../contexto/UserContext";
import { SueldoContainer } from "../components/solicitudes/SueldoContainer";
import { AprobacionGastos } from "../ComponentsGerentes/AprobacionGastos";
import { PDF } from "../components/view/PDF";
import { Remitos } from "../components/reportes/Remitos";
import { Mensajes } from "../components/mensajes/Mensajes";
import { EstadoUsuario } from "../components/estado/EstadoUsuario";
import { FacturaVendedor } from "../components/reportes/FacturaVendedor";
import { PeticionGET } from "../config/PeticionGET";
import { Demo } from "../components/Demo";
import { RendicionGastosVista } from "../view/RendicionGastosVista";
import { AntPagos } from "../view/AntPagos";



export const DashboardRoutes = ({ history }) => {
  const Text = useContext(UserContext);
  const { open } = Text;
 

  return (
    <>
      <Sidebar history={history} />
    
      
      <div className={!open ? "contenedor" : "contenedor-active"}>
      <Switch>
      <RouteEmpleado exact path="/perfil" component={Perfil} />
        <RouteGerente exact path="/aprobacion/sueldo" component={AprobacionAntcipoSueldo}/>
        <RouteGerente exact path="/aprobacion/vacaciones" component={AprobacionVacaciones}/>
        <RouteGerente exact path="/aprobacion/gastos" component={AprobacionGastos}/>
        <RouteGerente exact path="/pdf/:id" component={PDF}/>

        <RouteGerente exact path="/register" component={Register}/>
         
      <RouteEmpleado exact path="/sueldos" component={SueldoContainer} />
      <RouteEmpleado exact path="/vacaciones" component={Vacaciones} />
      <RouteEmpleado exact path="/anticipo/gastos" component={AnticipoGasto} />
       
        <RouteEmpleado exact path="/gastos" component={RendicionGastos} />
        <RouteEmpleado exact path="/editar/rendicion/:id" component={EditarRendicion}/>
        <RouteEmpleado exact path="/crear/rendicion/:id" component={CrearRendicion} />
        <RouteEmpleado exact path="/lista/rendicion/:id" component={ListaRendiciones} />
        <RouteEmpleado exact path="/rendicion" component={RendicionSinAnticipo} />
        <RouteEmpleado exact path="/img" component={Uploads} />
        <RouteEmpleado exact path="/prueba" component={Alerta} />
        <RouteEmpleado exact path='/reportes/gestion/remitos' component={Remitos}/>
        <RouteEmpleado exact path='/mensajes' component={Mensajes}/>
        <RouteEmpleado exact path='/estado/usuario' component={EstadoUsuario}/>
        <RouteEmpleado exact path='/reportes/facturacion/ventas' component={FacturaVendedor}/>
        <RouteEmpleado exact path='/demo' component={Demo}/>

        {/**Vistas */}
        <RouteEmpleado exact path='/comprobante/rendicion' component={RendicionGastosVista}/>
        <RouteEmpleado exact path='/pagos/anticipo' component={AntPagos}/>

        



        
        

        <Redirect to="/login" />
      </Switch>
      <Switch>
        
      </Switch>
      </div>
    </>
  );
};

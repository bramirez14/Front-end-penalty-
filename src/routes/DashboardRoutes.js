import React,{useState,useEffect,useContext} from "react";

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
import {  AprobacionAntcipoSueldo } from "../ComponentsGerentes/AprobacionAntcipoSueldo";
import { Register } from "../components/login/Register";
import { Perfil } from "../components/perfiles/Perfil";
import { AprobacionVacaciones } from "../ComponentsGerentes/AprobacionVacaciones";
import { UserContext } from "../context/UserContext";
import { SueldoContainer } from "../components/solicitudes/SueldoContainer";
import { AprobacionGastos } from "../ComponentsGerentes/AprobacionGastos";
import { PDF } from "../components/view/PDF";
import { Mensajes } from "../components/mensajes/Mensajes";
import { EstadoUsuario } from "../components/estado/EstadoUsuario";
import { Demo } from "../components/Demo";
import { RendicionGastosVista } from "../view/RendicionGastosVista";
import { PagosAntSueldo } from "../view/PagosAntSueldo";
import { PagosAntGasto } from "../view/pagoAntGasto/PagosAntGasto";
import { CambiarContraseña } from "../components/configuraciones/CambiarContraseña";
import { RendicionSinAnticipoContainer } from "../components/solicitudes/RendicionSinAnticipoContainer";
import { Verificacion } from "../components/verificaciones/Verificacion";
import { Kilometros } from "../components/rendicionesKm/Kilometros";
import { ListaKm } from "../components/rendicionesKm/ListaKm";
import { AprobacionKm } from "../ComponentsGerentes/AprobacionKm";
import { RendicionKmVista } from "../view/RendicionKmVista";
import { PagosKm } from "../view/PagosKm";
import { AntSueldoVista } from "../view/AntSueldoVista";
import { FacturacionDetalladata } from "../components/reportes/facturacionDetallada/FacturacionDetalladata";
import { FacturaVendedor } from "../components/reportes/facturacionVendedor/FacturaVendedor";
import { CuentaCorriente } from "../components/reportes/cuentaCorriente/CuentaCorriente";
import { Cobranza } from "../components/reportes/Cobranza/Cobranza";
import { ClientesInhabilitados } from "../components/reportes/ClientesInhabilitados/ClientesInhabilitados";
import { CargaPedidos } from "../components/reportes/cargaPedidos/CargaPedidos";
import { PendienteDetallado } from "../components/reportes/pendiente/PendienteDetallado";
import { PendienteAgrupadoCliente } from "../components/reportes/pendiente/PendienteAgrupadoCliente";
import { FuturosIngresos} from "../components/reportes/futurosIngresos/FuturosIngresos";
import { Stock } from "../components/reportes/stock/Stock";
import { SCC } from "../components/reportes/scc/SCC";
import { Remitos } from "../components/reportes/remitos/Remitos";
import { PrecioKM } from "../components/rendicionesKm/PrecioKM";
import { Alerta } from "../components/alertas/Alerta";
import { Recibo } from "../components/recibos/Recibo";

import { axiosURL } from "../config/axiosURL";
import { CargaRecibo } from "../components/recibos/CargaRecibo";
import { ListaRecibo } from "../components/recibos/ListaRecibo";

import { TarjetaCredito } from "../components/rendiciones/TarjetaCredito";
import { Prueba } from "../components/Prueba";
import { Gastos } from "../components/comprobantes/Gastos";
import { getState } from "../redux/auth/getState";
import {useDispatch,useSelector} from 'react-redux'
import { TarjetaCreditoComp } from "../components/comprobantes/TarjetaCreditoComp";

export const DashboardRoutes = ({ history }) => {
  const dispatch = useDispatch();
  const [alertas, setAlertas] = useState([])
  const Text = useContext(UserContext);
  const { open} = Text;
  
  const axiosGet = async () => {
    let {data} = await axiosURL.get('/msg/alertas');
    setAlertas(data);
};

useEffect(() => {
  axiosGet();
}, []);
useEffect(() => {
  getState(dispatch);
}, [dispatch])

  return (

    <>
      <Sidebar history={history} alertas={alertas} setAlertas={setAlertas} getAlertas={axiosGet} />
    
      <div className={!open ? "contenedor" : "contenedor-active"}>
      
      <Switch>
      
      <RouteEmpleado exact path="/anticipo/gastos" component={AnticipoGasto} />
      <RouteEmpleado exact path="/sueldos" component={SueldoContainer} />
      <RouteEmpleado exact path="/vacaciones" component={Vacaciones} />
      <RouteEmpleado exact path="/perfil" component={Perfil} />
        <RouteGerente exact path="/aprobacion/sueldo" component={AprobacionAntcipoSueldo}/>
        <RouteGerente exact path="/aprobacion/vacaciones" component={AprobacionVacaciones}/>
        <RouteGerente exact path="/aprobacion/gastos" component={AprobacionGastos}/>
        <RouteGerente  exact path='/aprobacion/km' component={AprobacionKm}/>
        <RouteGerente exact path="/verificaciones" component={Verificacion}/>
        <RouteGerente exact path="/pdf/:id" component={PDF}/>
        <RouteGerente exact path="/register" component={Register}/>
        <RouteEmpleado exact path="/gastos" component={RendicionGastos} />
        <RouteEmpleado exact path="/editar/rendicion/:id" component={EditarRendicion}/>
        <RouteEmpleado exact path="/crear/rendicion/:id" component={CrearRendicion} />
        <RouteEmpleado exact path="/lista/rendicion/:id" component={ListaRendiciones} />
        <RouteEmpleado exact path="/rendicion" component={RendicionSinAnticipoContainer} />
        <RouteEmpleado exact path="/img" component={Uploads} />
        <RouteEmpleado exact path='/mensajes' component={Mensajes}/>
        <RouteEmpleado exact path='/estado/usuario' component={EstadoUsuario}/>
        <RouteEmpleado exact path='/configuraciones/cambiar/contraseña' component={CambiarContraseña}/>
        <RouteEmpleado exact path='/demo' component={Demo}/>
        {/** Km */}
        <RouteEmpleado exact path='/kilometros' component={Kilometros}/>
        <RouteEmpleado exact path='/lista/kilometros' component={ListaKm}/>

        {/**Vistas */}
        <RouteEmpleado exact path='/pagos/anticipo' component={PagosAntSueldo}/>
        <RouteEmpleado exact path='/pagos/gasto' component={PagosAntGasto}/>
        <RouteEmpleado exact path='/pagos/km' component={PagosKm}/>

        <RouteEmpleado  exact path='/vista/rendicion/gasto' component={RendicionGastosVista}/>
        <RouteEmpleado  exact path='/vista/rendicion/km' component={RendicionKmVista}/>
        <RouteEmpleado  exact path='/vista/anicipo/sueldo' component={AntSueldoVista}/>

        {/**Reportes de Gestion */}
        <RouteEmpleado exact path='/reportes/gestion/remitos' component={Remitos}/>
        <RouteEmpleado exact path='/reportes/facturacion/ventas' component={FacturaVendedor}/>
        <RouteEmpleado exact path='/reportes/facturacion/detallada' component={FacturacionDetalladata}/>
        <RouteEmpleado exact path='/reportes/cuentacorriente' component={CuentaCorriente}/>
        <RouteEmpleado exact path='/reportes/cobranza' component={Cobranza}/>
        <RouteEmpleado exact path='/reportes/clientes/inhabilitados' component={ClientesInhabilitados}/>
        <RouteEmpleado exact path='/reportes/carga/pedidos' component={CargaPedidos}/>
        <RouteEmpleado exact path='/reportes/pendiente/detallado' component={PendienteDetallado}/>
        <RouteEmpleado exact path='/reportes/pendiente/cliente' component={PendienteAgrupadoCliente}/>
        <RouteEmpleado exact path='/reportes/futuros/ingresos' component={FuturosIngresos}/>
        <RouteEmpleado exact path='/reportes/stock' component={Stock}/>
        <RouteEmpleado exact path='/reportes/scc' component={SCC}/>
        <RouteEmpleado exact path='/precio/km' component={PrecioKM}/>
        {/**Alertas */}
        <RouteEmpleado exact path='/alerta' component={Alerta}/>

        {/** Recibos */}
        <RouteEmpleado exact path='/recibo' component={Recibo}/>
        <RouteEmpleado exact path='/lista/recibo' component={ListaRecibo}/>
         <RouteEmpleado exact path='/carga/recibo/:id' component={CargaRecibo}/>
        { /* Tarjeta de credito */}
         <RouteGerente exact path='/tarjeta/credito' component={ TarjetaCredito }/>
         <RouteGerente exact path='/pru' component={ Prueba }/> 

         { /* Comprobantes */}
         <RouteEmpleado exact path='/comprobantes/gastos' component={ Gastos }/> 
         <RouteEmpleado exact path='/comprobantes/tarjeta-credito' component={ TarjetaCreditoComp }/> 








        <Redirect to="/login" />
      </Switch>
      </div>
    
      
    </>
  );
};

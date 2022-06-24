import React, { useState, useEffect, useContext } from "react";
import { FacturacionDetalladata } from "../components/reportes/facturacionDetallada/FacturacionDetalladata";
import { ClientesInhabilitados } from "../components/reportes/ClientesInhabilitados/ClientesInhabilitados";
import { RendicionSinAnticipoContainer } from "../components/solicitudes/RendicionSinAnticipoContainer";
import { PendienteAgrupadoCliente } from "../components/reportes/pendiente/PendienteAgrupadoCliente";
import { FacturaVendedor } from "../components/reportes/facturacionVendedor/FacturaVendedor";
import { CuentaCorriente } from "../components/reportes/cuentaCorriente/CuentaCorriente";
import { PendienteDetallado } from "../components/reportes/pendiente/PendienteDetallado";
import { FuturosIngresos } from "../components/reportes/futurosIngresos/FuturosIngresos";
import { AprobacionAntcipoSueldo } from "../ComponentsGerentes/AprobacionAntcipoSueldo";
import { CambiarContraseña } from "../components/configuraciones/CambiarContraseña";
import { TarjetaCreditoComp } from "../components/comprobantes/TarjetaCreditoComp";
import { AprobacionVacaciones } from "../ComponentsGerentes/AprobacionVacaciones";
import { CargaPedidos } from "../components/reportes/cargaPedidos/CargaPedidos";
import { ListaRendiciones } from "../components/rendiciones/ListaRendiciones";
import { RendicionGastos } from "../components/rendiciones/RendicionGastos";
import { EditarRendicion } from "../components/rendiciones/EditarRendicion";
import { SueldoContainer } from "../components/solicitudes/SueldoContainer";
import { CrearRendicion } from "../components/rendiciones/CrearRendicion";
import { AprobacionGastos } from "../ComponentsGerentes/AprobacionGastos";
import { TarjetaCredito } from "../components/rendiciones/TarjetaCredito";
import { Verificacion } from "../components/verificaciones/Verificacion";
import { Routes, Navigate, Route } from "react-router-dom";
import { AnticipoGasto } from "../components/solicitudes/AnticipoGasto";
import { RendicionGastosVista } from "../view/RendicionGastosVista";
import { Kilometros } from "../components/rendicionesKm/Kilometros";
import { Cobranza } from "../components/reportes/Cobranza/Cobranza";
import { EstadoUsuario } from "../components/estado/EstadoUsuario";
import { PagosAntGasto } from "../view/pagoAntGasto/PagosAntGasto";
import { Vacaciones } from "../components/solicitudes/Vacaciones";
import { AprobacionKm } from "../ComponentsGerentes/AprobacionKm";
import { Remitos } from "../components/reportes/remitos/Remitos";
import { Calendario } from "../components/calendario/Calendario";
import { PrecioKM } from "../components/rendicionesKm/PrecioKM";
import { CargaRecibo } from "../components/recibos/CargaRecibo";
import { ListaRecibo } from "../components/recibos/ListaRecibo";
import { AprobacionSCC } from "../components/scc/AprobacionSCC";
import { ListaKm } from "../components/rendicionesKm/ListaKm";
import { RendicionKmVista } from "../view/RendicionKmVista";
import { Mensajes } from "../components/mensajes/Mensajes";
import { Stock } from "../components/reportes/stock/Stock";
import { Gastos } from "../components/comprobantes/Gastos";
import { Sidebar } from "../components/Sidebar/Sidebar";
import { Register } from "../components/login/Register";
import { PagosAntSueldo } from "../view/PagosAntSueldo";
import { AntSueldoVista } from "../view/AntSueldoVista";
import { Perfil } from "../components/perfiles/Perfil";
import { Alerta } from "../components/alertas/Alerta";
import { Recibo } from "../components/recibos/Recibo";
import { UserContext } from "../context/UserContext";
import { SCC } from "../components/reportes/scc/SCC";
import { getState } from "../redux/auth/getState";
import { ModalPDF } from "../helpers/ModalPDF";
import { axiosURL } from "../config/axiosURL";
import { PDF } from "../components/view/PDF";
import { Demo } from "../components/Demo";
import { PagosKm } from "../view/PagosKm";
import { useDispatch } from "react-redux";
import { Result, Button } from "antd";
import { NotFound } from "./NotFound";
import { PasePedidos } from "../components/pedidos/PasePedidos";
import { EditarDatosUsuario } from "../components/login/EditarDatosUsuario";

export const DashboardRoutes = ({ history }) => {
  const dispatch = useDispatch();
  const [alertas, setAlertas] = useState([]);
  const Text = useContext(UserContext);
  const { open } = Text;

  const axiosGet = async () => {
    let { data } = await axiosURL.get("/msg/alertas");
    setAlertas(data);
  };

  useEffect(() => {
    axiosGet();
  }, []);
  useEffect(() => {
    getState(dispatch);
  }, [dispatch]);
  const tipo = localStorage.getItem("type");
  return (
    <>
      <Sidebar
        history={history}
        alertas={alertas}
        setAlertas={setAlertas}
        getAlertas={axiosGet}
      />

      <div className={!open ? "contenedor" : "contenedor-active"}>
        {}
        <Routes>

       { tipo!=='Gerente'?
       <Route path="" element={<NotFound/>}/>
       : 
       <>
       
       <Route
            path="/aprobacion/sueldo"
            element={ <AprobacionAntcipoSueldo />}
          />
          <Route
            path="/aprobacion/vacaciones"
            element={<AprobacionVacaciones />}
          />
          </>}
          <Route path="/aprobacion/gastos" element={tipo!=='Gerente'?<NotFound/>:<AprobacionGastos />} />
          <Route path="/aprobacion/km" element={tipo!=='Gerente'?<NotFound/>:<AprobacionKm />} />
          <Route path="/verificaciones" element={tipo!=='Gerente'?<NotFound/>:<Verificacion />} />
          <Route path="/pdf/:id" element={<PDF />} />
          {/* Datos de usuario */}
          <Route path="/register" element={tipo!=='Gerente'?<NotFound/>:<Register />} />
          <Route path="/editar/usuario" element={tipo!=='Gerente'?<NotFound/>:<EditarDatosUsuario />} />

          <Route path="/tarjeta/credito" element={tipo!=='Gerente'?<NotFound/>:<TarjetaCredito/>} />
          {/** Calendario */}
          <Route path="/calendario" element={tipo!=='Gerente'?<NotFound/>:<Calendario />} />
          {/** SCC */}
          <Route path="/aprobacion/scc" element={<AprobacionSCC />} />
          {/** Km */}
        
          <Route path="/precio/km" element={tipo!=='Gerente'?<NotFound/>:<PrecioKM />} />
          {/* Empleados */} */
          <Route path="/perfil" element={<Perfil />} />
          <Route path="/anticipo/gasto" element={<AnticipoGasto />} />
          <Route path="/sueldo" element={<SueldoContainer />} />
          <Route path="/vacaciones" element={<Vacaciones />} />
          <Route path="/perfil" element={<Perfil />} />
          <Route path="/gastos" element={<RendicionGastos />} />
          <Route path="/editar/rendicion/:id" element={<EditarRendicion />} />
          <Route path="/crear/rendicion/:id" element={<CrearRendicion />} />
          <Route path="/lista/rendicion/:id" element={<ListaRendiciones />} />
          <Route
            path="/rendicion"
            element={<RendicionSinAnticipoContainer />}
          />
          <Route path="/mensajes" element={<Mensajes />} />
          <Route path="/estado/usuario" element={<EstadoUsuario />} />
          <Route
            path="/configuraciones/cambiar/contrasena"
            element={<CambiarContraseña />}
          />
          <Route path="/demo" element={<Demo />} />
          <Route path="/kilometros" element={<Kilometros />} />
          <Route path="/lista/kilometros" element={<ListaKm />} />
          {/**Vistas */}
          <Route path="/pagos/anticipo" element={<PagosAntSueldo />} />
          <Route path="/pagos/gasto" element={<PagosAntGasto />} />
          <Route path="/pagos/km" element={<PagosKm />} />
          <Route
            path="/vista/rendicion/gasto"
            element={<RendicionGastosVista />}
          />
          <Route path="/vista/rendicion/km" element={<RendicionKmVista />} />
          <Route path="/vista/anicipo/sueldo" element={<AntSueldoVista />} />
          {/**Reportes de Gestion */}
          <Route path="/reportes/gestion/remitos" element={<Remitos />} />
          <Route
            path="/reportes/facturacion/ventas"
            element={<FacturaVendedor />}
          />
          <Route
            path="/reportes/facturacion/detallada"
            element={<FacturacionDetalladata />}
          />
          <Route
            path="/reportes/cuentacorriente"
            element={<CuentaCorriente />}
          />
          <Route path="/reportes/cobranza" element={<Cobranza />} />
          <Route
            path="/reportes/clientes/inhabilitados"
            element={<ClientesInhabilitados />}
          />
          <Route path="/reportes/carga/pedidos" element={<CargaPedidos />} />
          <Route
            path="/reportes/pendiente/detallado"
            element={<PendienteDetallado />}
          />
          <Route
            path="/reportes/pendiente/cliente"
            element={<PendienteAgrupadoCliente />}
          />
          <Route
            path="/reportes/futuros/ingresos"
            element={<FuturosIngresos />}
          />
          <Route path="/reportes/stock" element={<Stock />} />
          <Route path="/reportes/scc" element={<SCC />} />
          {/**Alertas */}
          <Route path="/alerta" element={<Alerta />} />
          {/** Recibos */}
          <Route path="/recibo" element={<Recibo />} />
          <Route path="/lista/recibo" element={<ListaRecibo />} />
          <Route path="/carga/recibo/:id" element={<CargaRecibo />} />
          {/* Tarjeta de credito */}
          <Route path="/pru" element={<ModalPDF />} />
          {/* Comprobantes */}
          <Route path="/comprobantes/gastos" element={<Gastos />} />
          <Route
            path="/comprobantes/tarjeta-credito"
            element={<TarjetaCreditoComp />}
          />

          <Route
            path="*"
            element={
              <Result
                status="404"
                title="404"
                subTitle="Sorry, the page you visited does not exist."
                extra={
                  <Button type="primary" onClick={() => Navigate("/perfil")}>
                    Back Home
                  </Button>
                }
              />
            }
          />
        <Route path="/pase/pedidos" element={<PasePedidos />} />
        </Routes>


      </div>
    </>
  );
};

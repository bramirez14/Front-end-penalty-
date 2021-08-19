import React from "react";
import { Col, Row, Card } from "antd";
import { Link } from "react-router-dom";
import './css/tarjeta.css'
import { Get, GetGastosConAnt, GetGastosSinAnt, KmPendiente, muestraPendiente } from "./helpers/funciones";
export const Tarjetas = () => {
const anticipo = Get('/anticipo');
const vacacion = Get('/vacaciones');
const gastosConAnt= GetGastosConAnt('/gastos');
const  gastosSinAnt= GetGastosSinAnt('/gastos')
const gastoTotal= [...gastosConAnt,...gastosSinAnt];
const gastoMuestra= muestraPendiente(gastoTotal);
const anticipoMuestra= muestraPendiente(anticipo);
const vacacionMuestra= muestraPendiente(vacacion);
const km= KmPendiente('/todos/kilometros')
console.log(km);
const kmMuestra= muestraPendiente(km)
  return (
    <>
        <Card
          title="Anticipo de sueldo"
          extra={<Link to="/aprobacion/sueldo">Mas</Link>}
          bordered={false}
        >
          {anticipoMuestra.length > 0 ? (
            <h4>
              Pendiente: <b>{anticipoMuestra.length}</b>
            </h4>
          ) : (
            <h4 >No hay notificaciones!!!</h4>
          )}
        </Card>

        <Card
          title="Anticipo de gasto"
          extra={<Link to="/aprobacion/gastos">Mas</Link>}
          bordered={false}

        >
          {gastoMuestra?.length > 0 ? (
            <h4>
              Pendiente: <b>{gastoMuestra.length}</b>
            </h4>
          ) : (
            <h4>No hay notificaciones!!!</h4>
          )}
        </Card>
        <Card
          title="Vacaciones"
          extra={<Link to="/aprobacion/vacaciones">Mas</Link>}
          bordered={false}

        >
          {vacacionMuestra.length > 0 ? (
            <h4>
              Pendiente: <b>{vacacionMuestra.length}</b>
            </h4>
          ) : (
            <h4>No hay notificaciones!!!</h4>
          )}
        </Card>
        <Card
          title="Rendicion de Km"
          extra={<Link to="/aprobacion/km">Mas</Link>}
          bordered={false}

        >
        {kmMuestra.length > 0 ? (
            <h4>
              Pendiente: <b>{kmMuestra.length}</b>
            </h4>
          ) : (
            <h4 >No hay notificaciones!!!</h4>
          )}
        </Card>
  </>
  );
};

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
// kilometros
const km= KmPendiente('/todos/kilometros')
const kmMuestra= muestraPendiente(km)
console.log(kmMuestra);
  return (
    <Row gutter={[30,30]}>
      <Col xs={24} sm={12} md={12} lg={6} xl={6}>
        <Card
          title="Anticipo de sueldo"
          extra={<Link to="/aprobacion/sueldo">Mas</Link>}
        >
          {anticipoMuestra.length > 0 ? (
            <h4>
              Pendiente: <b>{anticipoMuestra.length}</b>
            </h4>
          ) : (
            <h4 >No hay notificaciones!!!</h4>
          )}
        </Card>
      </Col>

      <Col xs={24} sm={12} md={12} lg={6} xl={6}>
        <Card
          title="Anticipo de gasto"
          extra={<Link to="/aprobacion/gastos">Mas</Link>}
        >
          {gastoMuestra?.length > 0 ? (
            <h4>
              Pendiente: <b>{gastoMuestra.length}</b>
            </h4>
          ) : (
            <h4>No hay notificaciones!!!</h4>
          )}
        </Card>
      </Col>
      <Col xs={24} sm={12} md={12} lg={6} xl={6}>
        <Card
          title="Vacaciones"
          extra={<Link to="/aprobacion/vacaciones">Mas</Link>}
        >
          {vacacionMuestra.length > 0 ? (
            <h4>
              Pendiente: <b>{vacacionMuestra.length}</b>
            </h4>
          ) : (
            <h4>No hay notificaciones!!!</h4>
          )}
        </Card>
      </Col>
      <Col xs={24} sm={12} md={12} lg={6} xl={6}>
        <Card
          title="Rendicion de Km"
          extra={<Link to="/aprobacion/km">Mas</Link>}
        >
        {kmMuestra.length > 0 ? (
            <h4>
              Pendiente: <b>{kmMuestra.length}</b>
            </h4>
          ) : (
            <h4 >No hay notificaciones!!!</h4>
          )}
        </Card>
      </Col>
    </Row>
  );
};

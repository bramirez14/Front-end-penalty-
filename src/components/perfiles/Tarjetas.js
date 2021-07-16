import React, { useState, useEffect } from "react";
import { Col, Row, Card } from "antd";
import { Link } from "react-router-dom";
import {axiosURL} from "../../config/axiosURL";
import './css/tarjeta.css'
export const Tarjetas = () => {
  const [anticipo, setAnticipo] = useState([]);
  const [gasto, setGasto] = useState([]);
  const [vacacion, setVacacion] = useState([]);
  const N = localStorage.getItem("N"); // numero de registro
  const array = ["./anticipo", "./gastos", "./vacaciones"];

  useEffect(() => {
    const get = async (url) => {
      const res = await axiosURL(url);
      const resp= res.data;
      console.log(resp);
      /**opcion para el estado de Critian Rios */
      const op1= resp.filter(u=> u.estadoFinal === "pendiente" && u.estado==='aprobado' &&
      (u.usuario.departamentoId === 1 || u.usuario.departamentoId === 2))
      
      const op2 = resp.filter(d=>d.estadoFinal=== "pendiente" && d.estado==='aprobado' &&
      (d.usuario.departamentoId === 4 || d.usuario.departamentoId === 5))
    
      const op3 = resp.filter(d=>d.estado === "pendiente" && d.usuario.departamentoId===3)

      const unirOp=[...op1,...op2,...op3]
      console.log(unirOp);
      if (N === "901") {
        const filtro = resp.filter(
          (r) =>
            r.estado === "pendiente" &&
            (r.usuario.departamentoId === 1 || r.usuario.departamentoId === 2)
        );
        url === "./anticipo"
          ? setAnticipo(filtro)
          : url === "./gastos"
          ? setGasto(filtro)
          : setVacacion(filtro);
      }
      if (N === "902") {
        const filtro = unirOp
        url === "./anticipo"
          ? setAnticipo(filtro)
          : url === "./gastos"
          ? setGasto(filtro)
          : setVacacion(filtro);
      }
      if (N === "903") {
        const filtro = resp.filter(
          (r) =>
            r.estado === "pendiente" &&
            (r.usuario.departamentoId === 4 || r.usuario.departamentoId === 5)
        );
        url === "./anticipo"
          ? setAnticipo(filtro)
          : url === "./gastos"
          ? setGasto(filtro)
          : setVacacion(filtro);
      }
    };

    for (const i of array) {
      get(i);
    }
  }, []);
console.log(gasto);
  return (
    <Row gutter={[30,30]}>
      <Col xs={24} sm={12} md={12} lg={6} xl={6}>
        <Card
          title="Anticipo de sueldo"
          extra={<Link to="/aprobacion/sueldo">More</Link>}
        >
          {anticipo.length > 0 ? (
            <h4>
              Pendiente: <b>{anticipo.length}</b>
            </h4>
          ) : (
            <h4 >No hay notificaciones!!!</h4>
          )}
        </Card>
      </Col>

      <Col xs={24} sm={12} md={12} lg={6} xl={6}>
        <Card
          title="Anticipo de gasto"
          extra={<Link to="/aprobacion/gastos">More</Link>}
        >
          {gasto.length > 0 ? (
            <h4>
              Pendiente: <b>{gasto.length}</b>
            </h4>
          ) : (
            <h4>No hay notificaciones!!!</h4>
          )}
        </Card>
      </Col>
      <Col xs={24} sm={12} md={12} lg={6} xl={6}>
        <Card
          title="Vacaciones"
          extra={<Link to="/aprobacion/vacaciones">More</Link>}
        >
          {vacacion.length > 0 ? (
            <h4>
              Pendiente: <b>{vacacion.length}</b>
            </h4>
          ) : (
            <h4>No hay notificaciones!!!</h4>
          )}
        </Card>
      </Col>
      <Col xs={24} sm={12} md={12} lg={6} xl={6}>
        <Card
          title="Verificaciones"
          extra={<Link to="/verificaciones">More</Link>}
        >
          <h4>Card content</h4>
        </Card>
      </Col>
    </Row>
  );
};

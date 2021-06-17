import React, { useState, useEffect } from "react";
import { Col, Row, Card } from "antd";
import { Link } from "react-router-dom";
import axiosURL from "../../config/axiosURL";
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
      if (N === "901") {
        const filtro = res.data.filter(
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
        const filtro = res.data.filter(
          (r) => r.estadoFinal=== "pendiente" 
        );
        url === "./anticipo"
          ? setAnticipo(filtro)
          : url === "./gastos"
          ? setGasto(filtro)
          : setVacacion(filtro);
      }
      if (N === "903") {
        const filtro = res.data.filter(
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

  return (
    <Row gutter={[30,30]}>
      <Col xs={24} sm={24} md={12} lg={6} xl={6}>
        <Card
          title="Anticipo de sueldo"
          extra={<Link to="/aprobacion/sueldo">More</Link>}
        >
          {anticipo.length > 0 ? (
            <h4>
              {" "}
              Pendiente: <b>{anticipo.length}</b>
            </h4>
          ) : (
            <h4 >No hay!!!</h4>
          )}
        </Card>
      </Col>

      <Col xs={24} sm={24} md={12} lg={6} xl={6}>
        <Card
          title="Anticipo de gasto"
          extra={<Link to="/aprobacion/gastos">More</Link>}
        >
          {gasto.length > 0 ? (
            <h4>
              {" "}
              Pendiente: <b>{gasto.length}</b>
            </h4>
          ) : (
            <h4>No hay!!!</h4>
          )}
        </Card>
      </Col>
      <Col xs={24} sm={24} md={12} lg={6} xl={6}>
        <Card
          title="Vacaciones"
          extra={<Link to="/aprobacion/vacaciones">More</Link>}
        >
          {vacacion.length > 0 ? (
            <h4>
              {" "}
              Pendiente: <b>{vacacion.length}</b>
            </h4>
          ) : (
            <h4>No hay!!!</h4>
          )}
        </Card>
      </Col>
      <Col xs={24} sm={24} md={12} lg={6} xl={6}>
        <Card
          title="Default size card"
          extra={<a href="/aprobacion/sueldo">More</a>}
        >
          <h4>Card content</h4>
        </Card>
      </Col>
    </Row>
  );
};

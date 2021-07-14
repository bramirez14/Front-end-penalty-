import React, { useState } from "react";
import { axiosURL } from "../../config/axiosURL";
import { PeticionGET } from "../../config/PeticionGET";
import { FaBullhorn } from "react-icons/fa";
import { run } from "../helper/funciones";
import { Row, Col, Badge, Button } from "antd";
import "./mensajes.css";

export const Mensajes = () => {
  let [isOpen, setIsOpen] = useState(false);
  const [state, setState] = useState(false);
  /* alerta de anticipo */
  const id = localStorage.getItem("uid");
  const { anticipo,gasto,vacacion } = PeticionGET(`/${id}`);
  const filtroAprobadoAnt = anticipo?.filter((a) => a.estadoFinal === "aprobado" || a.estado==='rechazado');
const filtroAprobadoGasto = gasto?.filter((a) => a.estadoFinal === "aprobado" || a.estado==='rechazado');
const filtroAprobadoVacacion = vacacion?.filter((a) => a.estadoFinal === "aprobado" || a.estado==='rechazado');
console.log(filtroAprobadoAnt);
console.log(filtroAprobadoGasto);
console.log(filtroAprobadoVacacion);
const todosFiltros = (filtroAprobadoAnt,filtroAprobadoGasto,filtroAprobadoVacacion===undefined )?undefined:[...filtroAprobadoAnt,...filtroAprobadoGasto,...filtroAprobadoVacacion]
console.log(todosFiltros);
  return (
    <>
    
      <Row  >
        <Col xs={2} sm={4} md={6} lg={8} xl={10} offset={8}>
        <div className='contenedor-msj'>
        {todosFiltros?.map((a) => (
          <div className='item-contenedor'>
            <Row gutter="30">
              <Col  xs={2} sm={2} md={2} lg={2} xl={2}>
                <div className="circle"></div>
              </Col>
              <Col xs={4} sm={4} md={4} lg={4} xl={4}>
                <FaBullhorn className="icon-bocina" />
              </Col>
              <Col  xs={12} sm={12} md={12} lg={12} xl={12} >
                <div className="contenedor-inf">
                  <div className="item-despcription">
                    <span>Estado: {a.estadoFinal}  </span>
                  </div>
                  <div className="item-despcription">
                    <span> mensaje: {a.respMensaje}  </span>
                  </div>
                 
                </div>
              </Col>
              <Col xs={6} sm={6} md={6} lg={6} xl={6} >
              <div className="item-despcription">
                    <span style={{ color: "#46a461" }}> hace {/* run(a.f) */}</span>
                  </div>
              </Col>
            </Row>
            </div>
          ))
          }
          </div>
        </Col>
      </Row>
    </>
  );
};

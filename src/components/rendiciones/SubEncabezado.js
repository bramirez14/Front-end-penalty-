import React from 'react'
import {  Col, Row } from "antd";
import PeticionGET from '../../config/PeticionGET';


export const SubEncabezado = ({uuid,total,importeAnticipo}) => {
  const id = localStorage.getItem('uid')
  let usuario = PeticionGET(`/${id}`)


  const responsable = (departamento) => {
    let responsable;
    switch (departamento) {
      case "Sistema" || "Logistica":
        responsable = "Esteban Ramos";
        break;
      case "Administracion" || "Marketing":
        responsable = "Cristian De Sousa";
        break;
      default:
        responsable = "Cristian Rios";
        break;
    }
    return responsable;
  };
  return (
    <>
      <Row>
        <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
          <h3>Empleado: {usuario.nombre}, {usuario.apellido}</h3>
        </Col>
        <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}
          style={{
            borderBottom: "solid 1px rgba(92, 99, 105, 0.5)",
          }}
        >
          <div style={{ marginTop: "10px" }}>
            <h6>
              {" "}
              <b>Fecha:</b> {new Date().toLocaleDateString()}{" "}
            </h6>

            <h6>
              <b>Email:</b> {usuario.email}
            </h6>
            <h6>
              <b>Departamento:</b> {usuario.departamento?.departamento}
            </h6>
            <h6>
              <b>Responsable:</b>{" "}
              {responsable(usuario.departamento?.departamento)}
            </h6>
          </div>
        </Col>
        <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12} style={{
            borderBottom: "solid 1px rgba(92, 99, 105, 0.5)",
          }}>
          <h2 style={{marginLeft:'100px'}}> anticipo: #{uuid}</h2>
          <h4 style={{marginLeft:'100px'}}> Anticipo: ${importeAnticipo} </h4>
          <h4 style={{marginLeft:'100px'}}> Total: ${total} </h4>

        </Col>
      </Row>
    </>
  )
}

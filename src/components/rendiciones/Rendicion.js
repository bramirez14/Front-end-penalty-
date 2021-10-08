import React from "react";
import { Form,Col, Row,Divider } from "antd";
import "./css/createRendicion.css";
import { Tabla } from "./Tabla";
import { Titulo } from "../titulos/Titulo";

export const Rendicion = ({ history }) => {
  return (
  <>
      <Row>
        <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
          <Titulo  titulo='Rendicion de Gastos'/>
          
         
        </Col>
      </Row>
<Divider/>
      <Row>
        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
          <Tabla />
        </Col>
      </Row>
    </>
    
  );
};

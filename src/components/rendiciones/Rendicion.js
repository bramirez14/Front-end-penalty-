import React, { useState, useEffect } from "react";
import { Form, Input, Button, Select, Col, Row, Checkbox, Modal,Divider } from "antd";
import "./css/createRendicion.css";
import axiosURL from "../../config/axiosURL";
import { Tabla } from "./Tabla";
import { securedBrowserCache } from 'secured-browser-storage';
import { PeticionJWT } from "../../auth/PeticionJWT";
import { Titulo } from "../titulos/Titulo";

export const Rendicion = ({ history }) => {
  const id = securedBrowserCache.getItem('uid')
let peticionToken= PeticionJWT()


  return (
    <Form layout="vertical">
      <Row>
        <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
         
           <h2 className='title'>Rendicion de Gastos</h2>

              <h3>Empleado: {peticionToken.nombre}, {peticionToken.apellido}</h3>
            
          
          <Divider/>
        </Col>
    

     
      </Row>

      <Row>
        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
          <Tabla  />
        </Col>
      </Row>
      {/* <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12} offset={18}>
        <Form.Item>
          <Button>Submit</Button>
        </Form.Item>
      </Col> */}
    </Form>
  );
};

import React from "react";
import { Form,Col, Row } from "antd";
import "./css/createRendicion.css";
import { Tabla } from "./Tabla";

export const Rendicion = ({ history }) => {
  return (
    <Form layout="vertical">
      <Row>
        <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
          <h2 className='title'>Rendicion de Gastos</h2>
         
        </Col>
      </Row>

      <Row>
        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
          <Tabla />
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

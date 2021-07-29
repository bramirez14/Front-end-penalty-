import React from 'react'
import { Form,Col, Row } from "antd";
import { CardKm } from './CardKm';

export const ListaKm = () => {
    return (
    <div className='container'>
    <Row>
        <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
          <h2 className='title'>Rendicion de KM</h2>
        </Col>
      </Row>

      <Row>
        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
            <CardKm/>
        </Col>
    </Row>
    </div>
    )
}

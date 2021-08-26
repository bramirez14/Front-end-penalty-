import React from 'react'
import { Col, Row } from "antd";
import { CardKm } from './CardKm';
import { Titulo } from '../titulos/Titulo';

export const ListaKm = () => {
    return (
    <div className='container-form'>
    <Row>
        <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
        <Titulo numero={2} titulo='Rendicion de Kilometros'/>
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

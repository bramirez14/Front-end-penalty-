import React from 'react'
import { Row,Col,Card } from 'antd'
import { Link } from "react-router-dom";
import { Listo,AntSueldo } from './helpers/funcionesTarjeta';
import { antSueldo } from './helpers/funciones';


export const TarjetaEmpleado905 = () => { //Sandra y Bely

  return (
    <Row gutter={[30,30]}>
    <Col xs={24} sm={12} md={12} lg={6} xl={6}>
      <Card
        title="Rendicion de gasto"
        extra={<Link to="/vista/rendicion/gasto">Mas</Link>}
      >
       <Listo url={'/gastos'}/>
      </Card>
    </Col>

    <Col xs={24} sm={12} md={12} lg={6} xl={6}>
      <Card
        title="Rendicion de Km"
        extra={<Link to="/vista/rendicion/Km">Mas</Link>}
      >
      <Listo url={'/lista/kilometros'}/>
      </Card>
    </Col>
    <Col xs={24} sm={12} md={12} lg={6} xl={6}>
      <Card
        title="Anticipo de Sueldo"
        extra={<Link to="/vista/anicipo/sueldo">Mas</Link>}
      >
      {antSueldo('/anticipo')}
      </Card>
    </Col>
    <Col xs={24} sm={12} md={12} lg={6} xl={6}>
      <Card
        title="En Construccion"
      >
     <p>No hay notificaciones!!!</p>
      </Card>
    </Col>
  </Row>

    
  )
  
}

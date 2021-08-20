import React from 'react'
import { Row,Col,Card } from 'antd'
import { Link } from "react-router-dom";
import { Listo } from './helpers/funcionesTarjeta';


export const TarjetaEmpleado905 = () => { //Sandra y Bely

  return (
    <Row gutter={[20,20]}>
    <Col xs={12} sm={12} md={12} lg={12} xl={12}>
      <Card
        title="Rendicion de gasto"
        extra={<Link to="/vista/rendicion/gasto">Mas</Link>}
        bordered={false}
      >
       <Listo url={'/gastos'}/>
      </Card>
    </Col>

    <Col xs={12} sm={12} md={12} lg={12} xl={12}>
      <Card
        title="Rendicion de Km"
        extra={<Link to="/vista/rendicion/Km">Mas</Link>}
        bordered={false}

      >
      <Listo url={'/todos/kilometros'}/>
      </Card>
    </Col>
    <Col xs={12} sm={12} md={12} lg={12} xl={12}>
      <Card
        title="Anticipo de Sueldo"
        extra={<Link to="/vista/anicipo/sueldo">Mas</Link>}
        bordered={false}

      >
      <Listo url={'/anticipo'}/>
      </Card>
    </Col>
    <Col xs={12} sm={12} md={12} lg={12} xl={12}>
      <Card
        title="En Construccion"
        bordered={false}

      >
     <p>No hay notificaciones!!!</p>
      </Card>
    </Col>
  </Row>

    
  )
  
}

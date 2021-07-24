import React from 'react'
import { Row,Col,Card } from 'antd'
import { Link } from "react-router-dom";

export const TarjetaEmpleado0000 = () => {
    return (
        <Row gutter={[30,30]}>
        <Col xs={24} sm={12} md={12} lg={6} xl={6}>
          <Card
            title="En Construccion"
            extra={<Link to="/comprobante/rendicion">More</Link>}
          >
            <p>No hay notificaciones!!!</p>
          </Card>
        </Col>
    
        <Col xs={24} sm={12} md={12} lg={6} xl={6}>
          <Card
            title="En Construccion"
            extra={<Link to="/comprobante/rendicion">More</Link>}
          >
            <p>No hay notificaciones!!!</p>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={12} lg={6} xl={6}>
          <Card
            title="En Construccion"
            extra={<Link to="/comprobante/rendicion">More</Link>}
          >
            <p>No hay notificaciones!!!</p>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={12} lg={6} xl={6}>
          <Card
            title="En Construccion"
            extra={<Link to="/comprobante/rendicion">More</Link>}
          >
         <p>No hay notificaciones!!!</p>
          </Card>
        </Col>
      </Row>
    )
}

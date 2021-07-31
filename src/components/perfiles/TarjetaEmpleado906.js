import React from 'react'
import { Row,Col,Card } from 'antd'
import { Link } from "react-router-dom";
import { PagoAntGasto, PagoAntSueldo, PagosKm } from './helpers/funcionesTarjeta';

export const TarjetaEmpleado906 = () => {
    return (
        <Row gutter={[30,30]}>
        <Col xs={24} sm={12} md={12} lg={6} xl={6}>
          <Card
            title="Pago de Ant Sueldo"
            extra={<Link to="/pagos/anticipo">More</Link>}
          >
          <PagoAntSueldo/>
          </Card>
        </Col>
    
        <Col xs={24} sm={12} md={12} lg={6} xl={6}>
          <Card
            title="Pago de Ant Gasto"
            extra={<Link to="/pagos/gasto">More</Link>}
          >
         <PagoAntGasto/>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={12} lg={6} xl={6}>
          <Card
            title="Pago de  Km"
            extra={<Link to="/pagos/km">More</Link>}
          >
           <PagosKm/>
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

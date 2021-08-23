import React from 'react'
import { Row,Col,Card } from 'antd'
import { Link } from "react-router-dom";
import { PagoAntGasto, PagoAntSueldo, PagosKm } from './helpers/funcionesTarjeta';

export const TarjetaEmpleado906 = () => {
    return (
        <Row gutter={[20,20]}>
        <Col xs={12} sm={12} md={12} lg={12} xl={12}>
          <Card
            title="Sueldo"
            extra={<Link to="/pagos/anticipo">More</Link>}
            bordered={false}
          >
          <PagoAntSueldo/>
          </Card>
        </Col>
    
        <Col xs={12} sm={12} md={12} lg={12} xl={12}>
          <Card
            title=" Gasto"
            extra={<Link to="/pagos/gasto">More</Link>}
            bordered={false}

          >
         <PagoAntGasto/>
          </Card>
        </Col>
        <Col xs={12} sm={12} md={12} lg={12} xl={12}>
          <Card
            title=" Km"
            extra={<Link to="/pagos/km">More</Link>}
            bordered={false}

          >
           <PagosKm/>
          </Card>
        </Col>
        <Col xs={12} sm={12} md={12} lg={12} xl={12}>
          <Card
            title="En Construccion"
            extra={<Link to="/comprobante/rendicion">More</Link>}
            bordered={false}

          >
         <p>No hay notificaciones!!!</p>
          </Card>
        </Col>
      </Row>
    )
}

import { Card, Col, Row, Statistic } from 'antd'
import React from 'react'

export const Resultados = ({efectivo,cheques,retenciones,efectivoLiq}) => {
    const mpago= efectivo.map(ef=> ef.importe )
    const mefectivo= mpago.reduce((acumulador, item) => {return parseFloat(acumulador)+ parseFloat(item)},0)
    console.log(mefectivo);
    return (
        <Card style={{height:224}}>
        <Row gutter={[20,20]}>
                    
            <Col span={12}>
              <Statistic title="Efectivo" value={efectivo[0]?.importe} />
            </Col>
            <Col span={12}>
              <Statistic title="Cheque" value={cheques} precision={2} />
            
            </Col>
            <Col span={12}>
              <Statistic title="Retenciones" value={retenciones} />
            </Col>
            <Col span={12}>
              <Statistic title="Importe Liquidacion" value={efectivoLiq} />
            </Col>
          </Row>
    </Card>
    )
}

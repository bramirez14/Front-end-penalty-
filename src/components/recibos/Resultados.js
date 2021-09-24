import { Card, Col, Row, Statistic } from 'antd'
import React from 'react'
import { numberWithCommas } from '../reportes/helpers/funciones';

export const Resultados = ({efectivo,cheques,retenciones,depositos,efectivoLiq}) => {
    const mpagoefectivo= efectivo.map(ef=> ef.importe )
    const mefectivo= mpagoefectivo.reduce((acumulador, item) => {return parseFloat(acumulador)+ parseFloat(item)},0)
    const mpagocheques= cheques.map(c=> c.importe )
    const mcheques= mpagocheques.reduce((acumulador, item) => {return parseFloat(acumulador)+ parseFloat(item)},0)
    const mpagoretenciones= retenciones.map(ef=> ef.importe )
    const mretenciones= mpagoretenciones.reduce((acumulador, item) => {return parseFloat(acumulador)+ parseFloat(item)},0)
    const mpagodepositos= depositos.map(d=> d.importe )
    const mdepositos= mpagodepositos.reduce((acumulador, item) => {return parseFloat(acumulador)+ parseFloat(item)},0)
    const efectivoLiquidacion= efectivoLiq?.map(efliq=> efliq.saldoml )
    const Liq= efectivoLiquidacion.reduce((acumulador, item) => {return parseFloat(acumulador)+ parseFloat(item)},0)
    
    return (
        <Card style={{height:250}}>
        <Row gutter={[20,20]}>
                    
            <Col span={12}>
              <Statistic title="Efectivo" value={numberWithCommas(mefectivo)} precision={2}/>
            </Col>
            <Col span={12}>
              <Statistic title="Cheque" value={numberWithCommas(mcheques)} precision={2} />
            
            </Col>
            <Col span={12}>
              <Statistic title="Retenciones" value={numberWithCommas(mretenciones)} precision={2} />
            </Col>
            
            <Col span={12}>
              <Statistic title="Deposito"  value={numberWithCommas(mdepositos)} precision={2}/>
            </Col>
            <Col span={12}>
              <Statistic title="Importe Liquidacion"  value={numberWithCommas(Liq)} precision={2}/>
            </Col>
          </Row>
    </Card>
    )
}

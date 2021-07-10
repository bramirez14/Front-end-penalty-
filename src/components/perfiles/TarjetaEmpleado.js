import React from 'react'
import { Row,Col,Card } from 'antd'
import { TarjetasItems905,TarjetasItems906,TarjetasItems0000 } from './TarjetasItems'

export const TarjetaEmpleado = () => {
const N=localStorage.getItem('N');

  return (
    <Row gutter={20}>
      
    {N==='905'?
    
    TarjetasItems905.map(t=>
    
      <Col xs={24} sm={24} md={12} lg={6} xl={6}>
       
      <Card
       title={t.title}
        extra={t.extra}
      >
        {t.children}
      </Card>
    </Col> 
    ):N==='906'?TarjetasItems906.map(t=>
    
      <Col xs={24} sm={24} md={12} lg={6} xl={6}>
       
      <Card
       title={t.title}
        extra={t.extra}
      >
        {t.children}
      </Card>
    </Col> 
    ):TarjetasItems0000.map(t=>
    
      <Col xs={24} sm={24} md={12} lg={6} xl={6}>
       
      <Card
       title={t.title}
        extra={t.extra}
      >
        {t.children}
      </Card>
    </Col> 
    )

}
</Row>

    
  )
  
}

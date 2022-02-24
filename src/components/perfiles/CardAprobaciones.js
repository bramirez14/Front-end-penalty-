import React from 'react'
import { Col, Card} from "antd";
import { Tarjetas } from './Tarjetas';
import { TarjetaEmpleado905 } from './TarjetaEmpleado905';
import { TarjetaEmpleado906 } from './TarjetaEmpleado906';
export const CardAprobaciones = (array,url) => {
  const N = localStorage.getItem('N')
    return (
      <Col xs={24} sm={24} md={24} lg={9} xl={9}>
        <Card title='Aprobaciones'>
             {N==='905'?
             <TarjetaEmpleado905/>:N==='906'?
            <TarjetaEmpleado906/>:''
        }
        {(N==='901' || N==='902' || N==='903') && <Tarjetas/>}
        </Card>
     </Col>
       
    )
}

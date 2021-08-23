import React from 'react'
import { Col, Row, Card,List} from "antd";
import {Link} from "react-router-dom";
import { Tarjetas } from './Tarjetas';
import { TarjetaEmpleado905 } from './TarjetaEmpleado905';
import { TarjetaEmpleado906 } from './TarjetaEmpleado906';
import { TarjetaEmpleado0000 } from './TarjetaEmpleado0000';
export const CardAprobaciones = (array,url) => {
  const N = localStorage.getItem('N')
    return (
      <Col xs={9} sm={9} md={9} lg={9} xl={9}>
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

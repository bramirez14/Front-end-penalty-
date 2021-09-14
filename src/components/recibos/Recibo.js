import React, { useState } from 'react'
import { Row, Col, Button} from 'antd';
import './recibo.css'
import { TablaIngresos } from './TablaIngresos';
import { ClienteRecibo } from './ClienteRecibo';
import { TablaLiquidacion } from './TablaLiquidacion';
import { Resultados } from './Resultados';
import { axiosURLIntranetCobranzas } from '../../config/axiosURL';
import { uuid } from 'uuidv4';
import { PeticionGET } from '../../config/PeticionGET';



export const Recibo = () => {
  const N= localStorage.getItem('N');
  const id = localStorage.getItem('uid');
  const usuario = PeticionGET(`/${id}`);
  const uid = uuid().split('-')[0]
  const [liquidacionCliente, setLiquidacionCliente] = useState([]);
  const [ingresos, setIngresos] = useState([]);// a la DB
  const [dataCheck, setDataCheck] = useState([]);// a la DB
  const [efectivo, setEfectivo] = useState([]);
  const [cheques, setCheques] = useState([]);
  const [retenciones, setRetenciones] = useState([]);
const newIngresos=ingresos.map(n=> {return{
  ...n,
  nvendedor:N,
  nombrecompleto:`${usuario.nombre}${usuario.apellido}`,
  numerorecibo:uid,

}})
const newDataCheck=dataCheck.map(d=> {return{
  fecha:d.fecemision.split('T')[0],
  factura:d.cabeza,
  comprobante:d.codcabeza,
  importe:d.saldoml,
  nvendedor:N,
  nombrecompleto:`${usuario.nombre}${usuario.apellido}`,
  numerorecibo:uid,

}})


  const finalizar = async() => {
   const res= await axiosURLIntranetCobranzas.post('/recibos',{newIngresos,newDataCheck})
    console.log(res);
  }
  return( 
    <> 
      <Row gutter={[20,20]}>
    <Col xs={24} sm={24} md={24} lg={14} xl={14}>
    <ClienteRecibo cliente={liquidacionCliente}  setCliente={setLiquidacionCliente}/>
    </Col>
   <Col xs={24} sm={24} md={24} lg={10} xl={10}>
         <Resultados efectivo={efectivo}  cheques={cheques} retenciones={retenciones} />
      </Col>

      <Col xs={24} sm={24} md={24} lg={14} xl={14} >
        <TablaIngresos data={ingresos} setData={setIngresos} setEfectivo={setEfectivo} setCheques={setCheques} setRetenciones={setRetenciones}/>
      </Col>
      <Col xs={24} sm={24} md={24} lg={10} xl={10}>
      <TablaLiquidacion 
       cliente={liquidacionCliente}  setCliente={setLiquidacionCliente} dataCheck={dataCheck} setDataCheck={setDataCheck}
      />
      </Col>
      <Col xs={24} sm={24} md={24} lg={24} xl={24}>
    <Button onClick={finalizar}>Finalizar</Button>
      </Col>
    </Row>
  
    </>
    );
}
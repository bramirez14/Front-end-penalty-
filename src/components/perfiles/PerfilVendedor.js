 import React from 'react'
 import { Row,Col,Card } from 'antd';
import { PeticionJWT } from '../../auth/PeticionJWT';
import { PeticionGET } from '../../config/PeticionGET';
var numberFormat = new Intl.NumberFormat("es-ES");
 export const PerfilVendedor = () => {
    const id= localStorage.getItem('uid')
    const getjwt = PeticionJWT();
    const { nombre, apellido } = getjwt;
    const datosUsuarios=PeticionGET(`/${id}`)
    const anticipo = datosUsuarios?.anticipo;
    const vacacion = datosUsuarios?.vacacion;
    const km = datosUsuarios?.kilometro;
    const gasto = datosUsuarios?.gasto;

    const ultimoAnticipo = anticipo?.[anticipo?.length-1];
    const ultimaVacacion = vacacion?.[vacacion?.length-1];
    const ultimoGasto= gasto?.[gasto?.length-1]
    const ultimoKm= km?.[km?.length-1]
    console.log(ultimoKm);

   
     return (
         <>
         <Row gutter={20}>
             <Col xs={12} sm={12} md={12} lg={12} xl={12}>
          <Card   style={{backgroundColor:'#A0F3B8',height:234}} >
          <h2> INTRANET PENALTY!!!</h2> 
          <h2> HOLA {nombre} {apellido},</h2>
            <h2>  ES UN PLACER CONOCERTE 🤟😆</h2>
            

      </Card>
         </Col>
         <Col xs={6} sm={6} md={6} lg={6} xl={6}>    
         <Card title="Ultimo Anticipo solicitado" >
        <p>Estado: {ultimoAnticipo?.estadoFinal}</p>
        <p>Fecha:{ultimoAnticipo?.fecha} </p>
        <p>Importe: ${ numberFormat.format(ultimoAnticipo?.importe)} </p>
        
      </Card>
      </Col>
         <Col xs={6} sm={6} md={6} lg={6} xl={6}>    
         <Card title="Ultimas Vacaciones solicitadas" >
         <p>Estado: {ultimaVacacion?.estadoFinal}</p>
        <p>Fecha:{ultimaVacacion?.fechaSolicitud} </p>
        <p>Importe: {(ultimaVacacion?.periodo)} </p>
      </Card>
      </Col>
         
         </Row>


              <Row gutter={20} style={{marginTop:20}}>
            
          <Col xs={12} sm={12} md={12} lg={12} xl={12}>    
          <Card title="Default size card"  style={{height:420}}>
         <p>Card content</p>
         <p>Card content</p>
         <p>Card content</p>
       </Card>
       </Col>

       <Col xs={12} sm={12} md={12} lg={12} xl={12}>
            <Row gutter={20}>
            <Col xs={12} sm={12} md={12} lg={12} xl={12}>
           <Card title="Ultima rendicion de gasto" >
         <p>Estado:{ultimoGasto?.estadoFinal}</p>
         <p>Fecha:{ultimoGasto?.fecha}</p>
         <p>Importe:{ultimoGasto?.importe}</p>
        
       </Card>
          </Col>
       <Col xs={12} sm={12} md={12} lg={12} xl={12}>
           <Card title="Ultima rendicion de km" >
         <p>Estado:{ultimoKm?.estadoFinal}</p>
         <p>Km Total:{ultimoKm?.kmTotal}</p>
         <p>Importe:${ultimoKm?.importeTotal}</p>
       </Card> 
          </Col>
            </Row>

            <Row style={{marginTop:20}}>
            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
            <Card title="Default size card" style={{height:165}}>
         <p>Card content</p>
         <p>Card content</p>
       </Card> 
       </Col>

            </Row>
            </Col>
          
          
          </Row>

       </>
     )
 }
 
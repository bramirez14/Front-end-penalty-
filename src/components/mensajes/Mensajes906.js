import React from 'react'
import { PagoAntGasto, PagoAntSueldo, PagosKm } from '../perfiles/helpers/funcionesTarjeta';
import { Row, Col,List,Button } from "antd";
import { FaBullhorn } from "react-icons/fa";
import { run } from '../helper/funciones';
import { PeticionGET } from '../../config/PeticionGET';
import { Link } from 'react-router-dom';
import './mensajes.css'


export const Mensajes906 = () => {
    const pagosueldo= PagoAntSueldo();
  const pagosueldonew= pagosueldo.map(l=>{return{...l,link:'/pagos/anticipo',titulo:'anticipos de Sueldo'}});

const pagokm=PagosKm();
const pagokmnew= pagokm.map(l=>{return{...l,link:'/pagos/km',titulo:'kilometro'}});

const pagogasto=PagoAntGasto();
const pagogastonew= pagogasto.map(l=>{return{...l,link:'/pagos/gasto',titulo:'Anticipo de Gastos'}});


/**Sector respuesta */
const id= localStorage.getItem('uid');
const { anticipo,gasto,vacacion,kilometro } = PeticionGET(`/${id}`);
const filtroAnt = anticipo?.filter((a) => a.fd!==null);
const filtroGasto = gasto?.filter((a) => a.fd!==null);
const filtroVacacion = vacacion?.filter((a) => a.fd!==null);
const filtrokilometro= kilometro?.filter((a) => a.fd!==null)

const  respuesta= (filtroAnt,filtroGasto,filtrokilometro,filtroVacacion===undefined )?undefined:[...filtroAnt,...filtroGasto,...filtroVacacion,...filtrokilometro]
    const todos906=respuesta===undefined?'':[...pagosueldonew,...pagokmnew,...pagogastonew,...respuesta];
console.log(todos906);

  
    return (
        <List
        bordered
        dataSource={todos906}
        style={{width:'400px',margin:'auto', borderRadius:10,backgroundColor:'#fff'}}
        renderItem={item =>{
          return(
          <List.Item >
              <Row gutter="30">
              <Col xs={24} sm={24} md={24} lg={24} xl={24}>
              <h3 style={{borderBottom:'solid 1px #ddd'}}>{item.titulo}</h3>
              </Col>
                <Col  xs={2} sm={2} md={2} lg={2} xl={2}>
                  <div className="circle"></div>
                </Col>
                <Col xs={3} sm={3} md={3} lg={3} xl={3}>
                  <FaBullhorn className="icon-bocina" />
                </Col>
                <Col  xs={12} sm={12} md={12} lg={12} xl={12} >
                  <div className="contenedor-inf">
                    <div className="item-despcription">
                      <span>Estado: {item.estadoFinal}  </span>
                    </div>
                  
                  </div>
                </Col>
                <Col xs={6} sm={6} md={6} lg={6} xl={6} >
                <div className="item-despcription">
                      <span style={{ color: "#46a461" }}>  hace {run(item.f)}</span>
                    </div>
                </Col>
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                <Link to={item.link}>
                <Button type='link' >Mas...</Button>
                </Link>
              </Col>
              </Row>
            
            
          </List.Item>
        )}}
      />
    )
}

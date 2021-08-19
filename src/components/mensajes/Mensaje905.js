import React from 'react'
import { Listo } from '../perfiles/helpers/funcionesTarjeta';
import { Row, Col,List,Button,Space} from "antd";
import { FaBullhorn } from "react-icons/fa";
import { run } from '../helper/funciones';
import { PeticionGET } from '../../config/PeticionGET';
import { Link } from "react-router-dom";

export const Mensaje905 = () => {
  const listogasto =Listo('/gastos');
  const listogastonew= listogasto.map(l=>{return{...l,link:'/vista/rendicion/gasto',titulo:'Anticipo de Gasto'}});

  const listokm=Listo('/todos/kilometros');
  const listokmnew=listokm.map(l=>{return{...l,link:'/vista/rendicion/km',titulo:'Kilometros'}});

  const listosueldo=Listo('anticipo')
  const listosueldonew=listosueldo.map(l=>{return{...l,link:'/vista/anicipo/sueldo',titulo:'Anticipo de Sueldo'}})

/**Sector respuesta */
const id= localStorage.getItem('uid');
const { anticipo,gasto,vacacion,kilometro } = PeticionGET(`/${id}`);
const filtroAnt = anticipo?.filter((a) => a.fd!==null);
const filtroGasto = gasto?.filter((a) => a.fd!==null);
const filtroVacacion = vacacion?.filter((a) => a.fd!==null);
const filtrokilometro= kilometro?.filter((a) => a.fd!==null)

const  respuesta= (filtroAnt,filtroGasto,filtrokilometro,filtroVacacion===undefined )?undefined:[...filtroAnt,...filtroGasto,...filtroVacacion,...filtrokilometro]
const todos905=respuesta===undefined?'':[...listogastonew,...listokmnew,...listosueldonew,...respuesta];
console.log(todos905);
    return (
        <List
      bordered
      dataSource={todos905}
      style={{width:'400px',margin:'auto', borderRadius:10,backgroundColor:'#fff'}}
      renderItem={item =>{
        return(
        <List.Item >
            <Row gutter="30">
            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
              <h3 style={{borderBottom:'solid 1px #ddd'}}>{item.titulo}</h3>
              </Col>
              <Space/>
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

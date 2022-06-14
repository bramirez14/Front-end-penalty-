import React from 'react'
import { Row, Col,List } from "antd";
import { FaBullhorn } from "react-icons/fa";
import { run } from '../helper/funciones';
import { PeticionGET } from '../../config/PeticionGET';
import './mensajes.css'

export const Mensajes0000 = () => {
    /**Sector respuesta */
const id= localStorage.getItem('uid');
const { anticipo,gasto,vacacion,kilometro } = PeticionGET(`/${id}`);
const filtroAnt = anticipo?.filter((a) => a.fd!==null);
const filtroGasto = gasto?.filter((a) => a.fd!==null);
const filtroVacacion = vacacion?.filter((a) => a.fd!==null);
const filtrokilometro= kilometro?.filter((a) => a.fd!==null)

const  respuesta= (filtroAnt,filtroGasto,filtrokilometro,filtroVacacion===undefined )?undefined:[...filtroAnt,...filtroGasto,...filtroVacacion,...filtrokilometro]

    return (
        <List
        bordered
        dataSource={respuesta}
        style={{width:'400px',margin:'auto', borderRadius:10,backgroundColor:'#fff'}}
        renderItem={item =>{
          return(
          <List.Item >
              <Row gutter="30">
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
                    <div className="item-despcription">
                      <span> mensaje: {item.respMensaje}  </span>
                    </div>
                  </div>
                </Col>
                <Col xs={6} sm={6} md={6} lg={6} xl={6} >
                <div className="item-despcription">
                      <span style={{ color: "#46a461" }}>  hace {run(item.f)}</span>
                    </div>
                </Col>
              </Row>
            
            
          </List.Item>
        )}}
      />
    )
}

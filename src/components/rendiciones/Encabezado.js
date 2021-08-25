import React from "react";
import logo from "../../logoPenalty-remove.png";
import { Row, Col} from "antd";
import "./css/encabezado.css";

export const Encabezado = () => {

  return (
<div style={{paddingRight:'20px'}}>
    <Row  style={{borderBottom: "solid 1px rgba(92, 99, 105, 0.5)",width:'auto'}}>
    <Col xs={24} sm={24} md={24} lg={8} xl={8} >
    <div className="div-logo">
          <img src={logo} alt="logo" className="logo" />
        </div>
    </Col>
    <Col xs={24} sm={24} md={24} lg={8} xl={8}  >
          <p><b className="negrita"> E-mail:</b> info@penalty.com.ar </p>
          <p> <b className="negrita">Telefono:</b>+54112120-0200 </p>
          <p>  <b className="negrita">Sito Web:</b> www.penalty.com.ar </p>
    </Col>
    <Col xs={24} sm={4} md={24} lg={8} xl={8} >
         <p><b>Penalty Argentina S.A</b></p>
            
            <p>Dirección:Av.Libertador 6680 CABA</p>
            
          
    </Col>
  </Row>
  </div>
 
  )};

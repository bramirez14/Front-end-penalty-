import React from "react";
import logo from "../../logoPenalty.jpg";
import { Card, Row, Col, Form} from "antd";
import "./css/encabezado.css";

export const Encabezado = () => {
  const { Meta } = Card;

  return (

    <Row>
    <Col xs={14} sm={4} md={6} lg={8} xl={10}>
    <div className="div-logo">
          <img src={logo} alt="logo" className="logo" />
        </div>
    </Col>
    <Col xs={12} sm={16} md={12} lg={8} xl={4}>
    <div>
          <span className="spanarrafo">
            {" "}
            <b className="negrita"> E-mail:</b> info@penalty.com.ar <br />
            <b className="negrita">Telefono:</b>+54112120-0200 <br />
            <b className="negrita">Sito Web:</b> www.penalty.com.ar <br />
          </span>
        </div>
    </Col>
    <Col xs={24} sm={4} md={6} lg={8} xl={10}>
    <div>
          <span className="parrafo2">
            <b>Penalty Argentina S.A</b>
            <br />
            Dirección:Av.Libertador 6680 CABA
          </span>
        </div>
    </Col>
  </Row>
 
  )};

import React from "react";
import logo from "../../logoPenalty.jpg";
import { Card, Row, Col } from "antd";
import "./css/encabezado.css";

export const Encabezado = () => {
  const { Meta } = Card;

  return (
    <Row gutter={20}>
      <Col xs={8} sm={8} lg={8} className="columna">
        <div className="div-logo">
          <img src={logo} alt="logo" className="logo" />
        </div>
      </Col>

      <Col xs={8} sm={8} lg={8} className="columna">
        <div>
          <span className="spanarrafo">
            {" "}
            <b className="negrita"> E-mail:</b> info@penalty.com.ar <br />
            <b className="negrita">Telefono:</b>+54112120-0200 <br />
            <b className="negrita">Sito Web:</b> www.penalty.com.ar <br />
          </span>
        </div>
      </Col>
      <Col xs={8} sm={8} lg={8} className="columna">
        <div>
          <span className="parrafo2">
            <b>Penalty Argentina S.A</b>
            <br />
            Dirección:Av.Libertador 6680 CABA
          </span>
        </div>
      </Col>
    </Row>
  );
};

/* export const Encabezado = () => {
    return (
        <div className='contendor-encabezado'>
   <img src={logo}  alt='logo'/>
   <div>
        <p> <b className='negrita'> E-mail:</b> info@penalty.com.ar <br/>
        <b className='negrita'>Telefono:</b>+54112120-0200 <br/>
        <b className='negrita'>Sito Web:</b>  www.penalty.com.ar <br/>
        PenaltyArgentina S.A.  <br/>
        <b className='negrita'>Direccion:</b> Av.Libertador 6680  <br/>
        CABA
        </p>
        </div>
  
</div>
    )
} */

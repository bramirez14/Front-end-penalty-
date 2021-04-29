import { Col } from "antd";
import React from "react";
import "./css/titulo.css";
export const Titulo = ({ titulo, style }) => (
 <Col xs={24} sm={24} md={24} lg={24} xl={24}>
 <h3 className="titulo" style={style}>{titulo}</h3>
 </Col>
)

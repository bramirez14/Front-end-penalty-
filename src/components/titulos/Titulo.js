import React from "react";
import { Typography } from 'antd';
import "./css/titulo.css";

const { Title } = Typography;
export const Titulo = ({ titulo, style,numero }) => (
 <Title className="titulo" style={style} level={numero}>{titulo}</Title>
)

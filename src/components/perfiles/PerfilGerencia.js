import React from "react";
import { Row, Col, Card, Statistic } from "antd";
import "./css/perfiles.css";
import { Tarjetas } from "./Tarjetas";
import { ListaUsuarios } from "./ListaUsuarios";
import { CardEstado } from "./CardEstado";
import { CardAprobaciones } from "./CardAprobaciones";
export const PerfilGerencia = ({ history, usuarios }) => {
  return (
    <>
      <div className="contenedore">
      <CardEstado/>
      <ListaUsuarios lista={usuarios} />
      </div>
    </>
  );
};

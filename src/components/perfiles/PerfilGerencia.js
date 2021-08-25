import React from "react";
import { Row, Col, Card, Statistic } from "antd";
import { Tarjetas } from "./Tarjetas";
import { ListaUsuarios } from "./ListaUsuarios";
import { CardEstado } from "./CardEstado";
import { CardAprobaciones } from "./CardAprobaciones";
export const PerfilGerencia = ({ history, usuarios }) => {
  return (
    <>
      <CardEstado/>
      <ListaUsuarios lista={usuarios} />
    </>
  );
};

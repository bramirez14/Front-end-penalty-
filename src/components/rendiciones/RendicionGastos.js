import React from "react";
import { Encabezado } from "./Encabezado";
import { CreateRendicion } from "./CreateRendicion";
import "./css/rendicionGastos.css";
import { Titulo } from "../titulos/Titulo";
import { Form, Input, Button, Select, Col, Row } from "antd";

export const RendicionGastos = ({ history }) => {
  return (
    <>
      <div className ='contenedor-form' >
        {" "}
        <Encabezado />
        <CreateRendicion history={history} />
      </div>
    </>
  );
};

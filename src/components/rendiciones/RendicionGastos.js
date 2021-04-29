import React,{useContext} from "react";
import { Encabezado } from "./Encabezado";
import { Rendicion } from "./Rendicion";
import "./css/rendicionGastos.css";
import { Titulo } from "../titulos/Titulo";
import { Form, Input, Button, Select, Col, Row } from "antd";
import { UserContext } from "../../contexto/UserContext";

export const RendicionGastos = ({ history }) => {
  const Text = useContext(UserContext)
  const {open}=Text

  return (
    <>
    <div className={!open?'contenedor':'contenedor-active'}>
      <div className ='contenedor-form' >
        {" "}
        {/* <Encabezado /> */}
        <Rendicion history={history} />
      </div>
      </div>
    </>
  );
};

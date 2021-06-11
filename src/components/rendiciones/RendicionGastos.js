import React from "react";
import { Rendicion } from "./Rendicion";
import "./css/rendicionGastos.css";

export const RendicionGastos = ({ history }) => {
 
  return (
    <>
      <div className ='contenedor-form' >
        <Rendicion history={history} />
      </div>
    </>
  );
};

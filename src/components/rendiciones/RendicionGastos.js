import React from "react";
import { Rendicion } from "./Rendicion";
import "./css/rendicionGastos.css";

export const RendicionGastos = ({ history }) => {
 
  return (
    <>
      <div className ='container' >
        <Rendicion history={history} />
      </div>
    </>
  );
};

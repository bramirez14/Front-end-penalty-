import React,{useContext} from "react";
import { Rendicion } from "./Rendicion";
import "./css/rendicionGastos.css";
import { UserContext } from "../../contexto/UserContext";

export const RendicionGastos = ({ history }) => {
  const Text = useContext(UserContext)
  const {open}=Text

  return (
    <>
    <div className={!open?'contenedor-rendicion':'contenedor-rendicion-active'}>
      <div className ='contenedor-form' >
        <Rendicion history={history} />
      </div>
      </div>
    </>
  );
};

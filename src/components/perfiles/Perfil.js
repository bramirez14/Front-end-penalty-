import axios from "axios";
import React,{useEffect} from "react";
import { PerfilEmpleado } from "./PerfilEmpleado";
import { PerfilGerencia } from "./PerfilGerencia";

export const Perfil = ({ history }) => {
 
  const tipo = localStorage.getItem("type");
  return (
    <>
      {tipo === "Gerente" ? <PerfilGerencia /> : <PerfilEmpleado />}
    </>
  );
};

import React from "react";
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

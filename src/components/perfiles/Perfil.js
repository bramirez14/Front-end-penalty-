import React from "react";
import { Button } from "antd";
import { logout } from "../../auth/localStorage";
import { PerfilCristianAdmin } from "./PerfilCristianAdmin";
import { PerfilEmpleado } from "./PerfilEmpleado";

export const Perfil = ({ history }) => {
  const tipo = localStorage.getItem("type");
  const handleLogout = () => {
    logout();
    history.push("/login");
  };
  return (
    <>
      {tipo === "Gerente" ? <PerfilCristianAdmin /> : <PerfilEmpleado />}
      <Button onClick={handleLogout}>Salir</Button>
    </>
  );
};

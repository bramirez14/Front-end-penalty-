import React from "react";
import { Button } from "antd";
import { logout } from "../../auth/localStorage";
import { PerfilCristianAdmin } from "./PerfilCristianAdmin";
import { PerfilEmpleado } from "./PerfilEmpleado";
import axiosURL from "../../config/axiosURL";

export const Perfil = ({ history }) => {
  const id = localStorage.getItem('uid')
  const tipo = localStorage.getItem("type");
  const handleLogout = async() => {
    await axiosURL.put(`/cs/${id}`,{conectado:'NO'})
    
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

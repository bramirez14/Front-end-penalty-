import React, { useState,useContext, useEffect } from "react";
import { UserContext } from "../../contexto/UserContext";
import { Button, Card, Row, Col } from "antd";
import "./css/perfiles.css";
import { securedBrowserCache } from 'secured-browser-storage';

/* import bcryptjs from "bcryptjs";*/

import { logout } from "../../auth/localStorage";
import axiosURL from "../../config/axiosURL";
import { PeticionJWT } from "../../auth/PeticionJWT";

export const PerfilCristianAdmin = ({ history }) => {
  const Text = useContext(UserContext);
  const { open,setStorage } = Text;
  
  let tokenStorage = (localStorage.getItem("token"));
  const handleLogout = () => {
    logout();
    history.push("/login");
  };

  //Peticion get para saber cuando vence el localStorage
  const [tokenEstado, setTokenEstado] = useState({});

  const { nombre, apellido } = tokenEstado;
  useEffect(() => {
    const cargarUsuario = async () => {
      let datosJWT = await axiosURL.get("/check", {
        headers: { token: tokenStorage },
      });
      setTokenEstado(datosJWT.data);
      setStorage(datosJWT.data);
    };
    cargarUsuario();
  }, []);
let peticion=PeticionJWT();

console.log(peticion);

console.log(!open);

  return (
    <>
      <div className={!open ? "contenedor" : "contenedor-active"}>
          <h1>
            Bienvenido {nombre},{apellido}  espero que te encuentres bien!!!
          </h1>
          
          <Button className="btn" onClick={handleLogout}>
            Salir{" "}
          </Button>
      </div>
    </>
  );
};

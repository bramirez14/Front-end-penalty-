import React, { useState,useContext, useEffect } from "react";
import "./css/perfiles.css";

/* import bcryptjs from "bcryptjs";*/

import axiosURL from "../../config/axiosURL";

export const PerfilCristianAdmin = ({ history }) => {

  
  let tokenStorage = (localStorage.getItem("token"));
  

  //Peticion get para saber cuando vence el localStorage
  const [tokenEstado, setTokenEstado] = useState({});

  const { nombre, apellido } = tokenEstado;
  useEffect(() => {
    const cargarUsuario = async () => {
      let datosJWT = await axiosURL.get("/check", {
        headers: { token: tokenStorage },
      });
      setTokenEstado(datosJWT.data);
    };
    cargarUsuario();
  }, []);


  return (
    <>
          <h1>
            Bienvenido {nombre},{apellido}  espero que te encuentres bien!!!
          </h1>
          

    </>
  );
};

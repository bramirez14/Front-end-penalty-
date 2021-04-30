import React, { useState } from "react";
import { useContext, useEffect } from "react";
import { UserContext } from "../../contexto/UserContext";
import { Button, Card, Row, Col } from "antd";
import SidebarContext from "../context/SidebarContext";
import "./css/perefilCristianAdmin.css";
import { securedBrowserCache } from 'secured-browser-storage';

/* import bcryptjs from "bcryptjs";*/
import md5 from "md5"; 

import { Tarjeta } from "../helperPerfiles/Tarjeta";
import { logout } from "../../auth/localStorage";
import axiosURL from "../../config/axiosURL";

export const PerfilCristianAdmin = ({ history }) => {



  securedBrowserCache.setStorageType('localStorage'); 
  const Text = useContext(UserContext);
  const { open,storage,setStorage } = Text;
  
  let tokenStorage = (localStorage.getItem("token"));
  const val = securedBrowserCache.getItem('type')
  const handleLogout = () => {
    logout();
    console.log(logout());
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

  return (
    <>
      <div className={!open ? "contenedor" : "contenedor-active"}>
        <div className={!open ? "container" : "container-active"}>
          <h1>
            Bienvenido {nombre},{apellido}  espero que te encuentres bien!!!
          </h1>
          <Row gutter={16}>
            <Col span={6}>
              <Card title="Card title" bordered={false}>
                Card content
              </Card>
            </Col>
            <Col span={6}>
              <Card title="Card title" bordered={false}>
                Card content
              </Card>
            </Col>
            <Col span={6}>
              <Card title="Card title" bordered={false}>
                Card content
              </Card>
            </Col>
            <Col span={6}>
              <Card title="Card title" bordered={false}>
                Card content
              </Card>
            </Col>
          </Row>
          <Button className="btn" onClick={handleLogout}>
            Salir{" "}
          </Button>
        </div>
      </div>
    </>
  );
};

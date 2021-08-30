import React, { useState,useEffect } from "react";
import "react-pro-sidebar/dist/css/styles.css";
import "antd/dist/antd.css";
import "./App.css";
import  io  from "socket.io-client";

import { Routes } from "./routes/Routes";
import { UserContext } from "./contexto/UserContext";
import { PeticionJWT } from "./auth/PeticionJWT";
import { SocketProvider } from "./contexto/SocketContext";
import { useGet } from "./hooks/useGet";

function App() {
  PeticionJWT();
  const [openn, setOpen] = useState(false);
  const [auth, setAuth] = useState(false)
  const [arrayUsuarios, setArrayUsuarios] = useState()
  const [msj, setMsj] = useState([])
  const [usuarios, setUsuarios] = useState([])
  const [alertas, nuevasAlertas] = useGet("/msg/alertas");
console.log(nuevasAlertas);
  return (
    <UserContext.Provider
      value={{
        open: openn,
        setOpen: setOpen,
        auth:auth,
        setAuth:setAuth,
        arrayUsuarios:arrayUsuarios,
        setArrayUsuarios:setArrayUsuarios,
        msj:msj,
        setMsj:setMsj,
        usuariosIO:usuarios,
        setUsuariosIO:setUsuarios,
        alertas:alertas,
        nuevasAlertas:nuevasAlertas,
      }}
    >
{/*       <SocketProvider>
 */}
          <Routes />
      {/* </SocketProvider> */}

    </UserContext.Provider>
  );
}

export default App;

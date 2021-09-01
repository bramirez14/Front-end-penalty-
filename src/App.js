import React, { useState } from "react";
import "react-pro-sidebar/dist/css/styles.css";
import "antd/dist/antd.css";
import "./App.css";

import { Routes } from "./routes/Routes";
import { UserContext } from "./context/UserContext";
import { PeticionJWT } from "./auth/PeticionJWT";
import { SocketProvider } from "./context/SocketContext";

function App() {
  PeticionJWT();
  const [openn, setOpen] = useState(false);
  const [auth, setAuth] = useState(false)
  const [arrayUsuarios, setArrayUsuarios] = useState()
  const [msj, setMsj] = useState([])
  const [usuarios, setUsuarios] = useState([])
const [alertas, setAlertas] = useState([])

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
        setAlertas:setAlertas,
       
      }}
    >
      <SocketProvider>

          <Routes />
      </SocketProvider>

    </UserContext.Provider>
  );
}

export default App;

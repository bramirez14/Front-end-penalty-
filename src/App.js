import React, { useState,useEffect } from "react";
import "react-pro-sidebar/dist/css/styles.css";
import "antd/dist/antd.css";
import "./App.css";
import  io  from "socket.io-client";

import { Routes } from "./routes/Routes";
import { UserContext } from "./contexto/UserContext";
import { PeticionJWT } from "./auth/PeticionJWT";
import { SocketProvider } from "./contexto/SocketContext";
import { SocketContenido } from "./contexto/SocketContenido";

function App() {
  PeticionJWT();
  const [openn, setOpen] = useState(false);
  const [auth, setAuth] = useState(false)
  const [arrayUsuarios, setArrayUsuarios] = useState()
  const [stateSocket, setStateSocket] = useState([])
  return (
    <UserContext.Provider
      value={{
        open: openn,
        setOpen: setOpen,
        auth:auth,
        setAuth:setAuth,
        arrayUsuarios:arrayUsuarios,
        setArrayUsuarios:setArrayUsuarios,
      }}
    >
      {/* <SocketProvider> */}
<SocketContenido.Provider value={{
  datosSocket:stateSocket,
  setDatosSocket:setStateSocket
}}>
<Routes />

</SocketContenido.Provider>
     {/*  </SocketProvider> */}

    </UserContext.Provider>
  );
}

export default App;

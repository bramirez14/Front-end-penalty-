import React, { useState,useEffect } from "react";
import "react-pro-sidebar/dist/css/styles.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-datepicker/dist/react-datepicker.css";
import "antd/dist/antd.css";
import "./App.css";
import  io  from "socket.io-client";

import { Routes } from "./routes/Routes";
import { UserContext } from "./contexto/UserContext";
import { PeticionJWT } from "./auth/PeticionJWT";
import { SocketProvider } from "./contexto/SocketContext";

function App() {
/*   const connectSocketServer =  ()=>{
    const socket =io.connect('http://localhost:4000',{
      transports:['websocket']
    })
    return socket; 
  } */
 // const [socket] = useState(connectSocketServer())
  const [openn, setOpen] = useState(false);
  const [auth, setAuth] = useState(false)
 // const [online, setOnline] = useState(false)
  PeticionJWT();

/*   useEffect(() => {
    console.log(socket);
    setOnline(socket.connected)
    
    }, [socket])
  useEffect(() => {
    effect
    return () => {
      cleanup
    }
  }, []) */
  return (
    <UserContext.Provider
      value={{
        open: openn,
        setOpen: setOpen,
        auth:auth,
        setAuth:setAuth,
      }}
    >
      <SocketProvider>

          <Routes />
      </SocketProvider>

    </UserContext.Provider>
  );
}

export default App;

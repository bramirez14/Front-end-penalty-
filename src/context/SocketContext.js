import React, {  useEffect, useState, } from "react";
import { createContext } from "react";
import { useSocket } from "../hooks/useSocket";

export const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  const [alertas, setAlertas] = useState([])
  const { socket, conectarSocket } = useSocket(
    "http://intranet.penalty.com.ar:4000"
  );
  
 useEffect(() => {
     conectarSocket();
  }, [conectarSocket]);

 /*  useEffect(() => {
    if (!auth) {
      desconectarSocket();
    }
  }, [ auth,desconectarSocket]); */

 /*  useEffect(() => {
    socket?.on("lista-usuarios", (usuarios) => {
      setArrayUsuarios(usuarios);
    });
  }, [socket, setArrayUsuarios]);  */

  useEffect(() => {
    socket?.on("todas-alertas",(data)=>{
      setAlertas(data);

    })
  }, [socket])

  return (
    <SocketContext.Provider value={{ socket,alertas,setAlertas }}>
      {children}
    </SocketContext.Provider>
  );
};

import React, { useContext, useEffect, useState, } from "react";
import { createContext } from "react";
import { useSocket } from "../hooks/useSocket";
import { UserContext } from "./UserContext";

export const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  const [alertas, setAlertas] = useState([])
  const { auth, setArrayUsuarios } = useContext(UserContext);//no es este investigar desp 
  const { socket, conectarSocket, desconectarSocket } = useSocket(
    "http://intranet.penalty.com.ar:4000"
  );
  
 useEffect(() => {
      console.log('estoy autenticado');
     conectarSocket();
  }, [conectarSocket]);

 /*  useEffect(() => {
    if (!auth) {
      console.log('estoy deconcectado');
      desconectarSocket();
    }
  }, [ auth,desconectarSocket]); */

 /*  useEffect(() => {
    socket?.on("lista-usuarios", (usuarios) => {
      console.log('enviando');
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

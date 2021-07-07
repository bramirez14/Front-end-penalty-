import React, { useContext, useEffect, } from "react";
import { createContext } from "react";
import { useSocket } from "../hooks/useSocket";
import { UserContext } from "./UserContext";

export const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  const { auth, setArrayUsuarios } = useContext(UserContext);
  const { socket, online, conectarSocket, desconectarSocket } = useSocket(
    "http://localhost:4000"
  );
  console.log(auth);
  useEffect(() => {
    if (auth) {
      console.log('estoy autenticado');
     conectarSocket();
     
    }
  }, [ auth,conectarSocket]);

  useEffect(() => {
    if (!auth) {
      console.log('estoy deconcectado');
      desconectarSocket();
    }
  }, [ auth,desconectarSocket]);

  useEffect(() => {
    socket?.on("lista-usuarios", (usuarios) => {
      console.log('enviando');
      setArrayUsuarios(usuarios);
    });
  }, [socket, setArrayUsuarios]);
  return (
    <SocketContext.Provider value={{ socket, online }}>
      {children}
    </SocketContext.Provider>
  );
};

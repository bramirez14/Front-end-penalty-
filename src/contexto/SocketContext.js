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
  useEffect(() => {
    if (auth) {
      conectarSocket();
    }
  }, [conectarSocket, auth]);

  useEffect(() => {
    if (!auth) {
      desconectarSocket();
    }
  }, [desconectarSocket, auth]);

  useEffect(() => {
    socket?.on("lista-usuarios", (usuarios) => {
      setArrayUsuarios(usuarios);
    });
  }, [socket, setArrayUsuarios]);

  return (
    <SocketContext.Provider value={{ socket, online }}>
      {children}
    </SocketContext.Provider>
  );
};

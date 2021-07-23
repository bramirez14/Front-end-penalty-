import React,{useState,useEffect,useContext} from "react";
import { PerfilEmpleado } from "./PerfilEmpleado";
import { PerfilGerencia } from "./PerfilGerencia";
import io from "socket.io-client";
import { SocketContenido } from "../../contexto/SocketContenido";

export const Perfil = ({ history }) => {
  const { datosSocket,setDatosSocket} = useContext(SocketContenido)
  useEffect(() => {
    const socket =  io.connect( "//intranet.penalty.com.ar:4000",{ 
    transports: ['websocket'],
    autoConnect: true,
    forceNew: true,})
    console.log(socket);

    socket.on('lista-usuarios', (data)=> {
      console.log(data); 
      setDatosSocket(data)
    });
    
   
}, []);
console.log(datosSocket);
  const tipo = localStorage.getItem("type");
  return (
    <>
      {tipo === "Gerente" ? <PerfilGerencia datos={datosSocket} /> : <PerfilEmpleado />}
    </>
  );
};

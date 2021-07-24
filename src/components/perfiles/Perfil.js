import React,{useEffect,useRef} from "react";
import { PerfilEmpleado } from "./PerfilEmpleado";
import { PerfilGerencia } from "./PerfilGerencia";
import io from "socket.io-client";
export const Perfil = ({ history }) => {
 
  useEffect(() => {
    const socket =  io.connect( "http://intranet.penalty.com.ar/:4000",{ 
    transports: ['websocket'],
    autoConnect: true,
    forceNew: true,})
    console.log(socket);

    socket.on('lista-usuarios', (data)=> { 
      console.log(data);
    });
    
   
}, []);


  const tipo = localStorage.getItem("type");
  return (
    <>
      {tipo === "Gerente" ? <PerfilGerencia /> : <PerfilEmpleado />}
    </>
  );
};

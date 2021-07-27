import React,{useState,useEffect} from "react";
import { PerfilEmpleado } from "./PerfilEmpleado";
import { PerfilGerencia } from "./PerfilGerencia";
import io from "socket.io-client";
export const Perfil = ({ history }) => {
 const [stateusuarios, setStateusuarios] = useState([])
  useEffect(() => {
    const socket =  io.connect( "//intranet.penalty.com.ar:4000",{ 
    transports: ['websocket'],
    autoConnect: true,
    forceNew: true,})
    //console.log(socket);
    socket.on('lista-usuarios', (data)=> { 
      setStateusuarios(data)
    });
    
   
}, []);


  const tipo = localStorage.getItem("type");
  return (
    <>
      {tipo === "Gerente" ? <PerfilGerencia usuarios={stateusuarios}/> : <PerfilEmpleado />}
    </>
  );
};

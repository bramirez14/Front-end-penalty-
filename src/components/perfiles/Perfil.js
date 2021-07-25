import React,{useState,useEffect} from "react";
import { PerfilEmpleado } from "./PerfilEmpleado";
import { PerfilGerencia } from "./PerfilGerencia";
import io from "socket.io-client";
export const Perfil = ({ history }) => {
 const [stateusuarios, setStateusuarios] = useState([])
  useEffect(() => {
    const socket =  io.connect( "http://localhost:4000",{ 
    transports: ['websocket'],
    autoConnect: true,
    forceNew: true,})
    console.log(socket);

    socket.on('lista-usuarios', (data)=> { 
      console.log(data);
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

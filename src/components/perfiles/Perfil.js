import React,{ useEffect, useContext } from "react";
import { PerfilEmpleado } from "./PerfilEmpleado";
import { PerfilGerencia } from "./PerfilGerencia";
import io from "socket.io-client";
import { UserContext } from "../../context/UserContext";
import "./css/perfiles.css";

export const Perfil = () => {
const {usuariosIO,setUsuariosIO} = useContext(UserContext)
 const token = localStorage.getItem('token'); // se solicita el token de localstorage

  useEffect(() => {
    const socket =  io.connect( "//intranet.penalty.com.ar:4000",{ 
    transports: ['websocket'],
    autoConnect: true,
    forceNew: true,
    query: {
      'x-token': token
  }}
    )
    //console.log(socket);
    socket.on('lista-usuarios', (data)=> { 
      setUsuariosIO(data)
    });
}, [setUsuariosIO, token]);
  const tipo = localStorage.getItem("type");
  return (
    <div className='contenedore'>
      {tipo === "Gerente" ? <PerfilGerencia usuarios={usuariosIO}/> : <PerfilEmpleado />}
      </div>
      
  );
};

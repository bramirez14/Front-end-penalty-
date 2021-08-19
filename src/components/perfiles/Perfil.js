import React,{useState,useEffect,useContext} from "react";
import { PerfilEmpleado } from "./PerfilEmpleado";
import { PerfilGerencia } from "./PerfilGerencia";
import io from "socket.io-client";
import { UserContext } from "../../contexto/UserContext";

export const Perfil = ({ history }) => {
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
      console.log(data);
      setUsuariosIO(data)
    });
}, [setUsuariosIO, token]);
  const tipo = localStorage.getItem("type");
  console.log(usuariosIO);
  return (
    <>
      {tipo === "Gerente" ? <PerfilGerencia usuarios={usuariosIO}/> : <PerfilEmpleado />}
    </>
  );
};

import React, { useState,useContext, useEffect,useRef } from "react";
import { Drawer, List, Avatar, Divider, Col,Row,Card} from "antd";
import "./css/perfiles.css";

/* import bcryptjs from "bcryptjs";*/
import axiosURL from "../../config/axiosURL";
import PeticionGET from "../../config/PeticionGET";
import { Tarjetas } from "./Tarjetas";
import { ListaUsuarios } from "./ListaUsuarios";
import socket from "../Socket";

export const PerfilCristianAdmin = ({ history }) => {


  
  let tokenStorage = (localStorage.getItem("token"));
  

  //Peticion get para saber cuando vence el localStorage
/*   const [tokenEstado, setTokenEstado] = useState({});

  useEffect(() => {
    const cargarUsuario = async () => {
      let datosJWT = await axiosURL.get("/check", {
        headers: { token: tokenStorage },
      });
      setTokenEstado(datosJWT.data);
    };
    cargarUsuario();
  }, []); */
  useEffect(() => {
    socket.emit("conectado", {conectado:'conect'});
    console.log('conect');
  }, []);


  return ( 
    <>
     <div className='contenedore'>
   <Tarjetas/>
  
  {/**Lista */}
  <ListaUsuarios/>
</div>
  
       
 
         
          

    </>
  );
};

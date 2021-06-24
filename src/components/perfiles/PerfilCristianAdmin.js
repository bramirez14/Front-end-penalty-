import React, { useState,useContext, useEffect,useRef } from "react";
import { Drawer, List, Avatar, Divider, Col,Row,Card} from "antd";
import "./css/perfiles.css";

/* import bcryptjs from "bcryptjs";*/
import axiosURL from "../../config/axiosURL";
import PeticionGET from "../../config/PeticionGET";
import { Tarjetas } from "./Tarjetas";
import { ListaUsuarios } from "./ListaUsuarios";
import socket from "../Socket";
import { SocketContext } from "../../contexto/SocketContext";
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import { UserContext } from "../../contexto/UserContext";

export const PerfilCristianAdmin = ({ history }) => {
const {arrayUsuarios} = useContext(UserContext)

  
  

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

console.log(arrayUsuarios);

  return ( 
    <>
     <div className='contenedore'>
   <Tarjetas/>
  
  {/**Lista */}
  <ListaUsuarios/>
  <div style={{display:'flex', flexWrap:'wrap'}}>
  {
    
  arrayUsuarios?.map( a =>
    <Card
    style={{ width: 300 }}
    cover={
      <img
        alt="example"
        src={a.imagen}
      />
    }
    actions={[
      <SettingOutlined key="setting" />,
      <EditOutlined key="edit" />,
      <EllipsisOutlined key="ellipsis" />,
    ]}
  >
    <h3>User:{a.nombre}</h3>
   <h3>Conectado:{a.conectado}</h3> 
  </Card>

  )
  }
</div>



</div>
  
       
 
         
          

    </>
  );
};

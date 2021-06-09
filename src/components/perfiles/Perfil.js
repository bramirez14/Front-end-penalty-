import React,{useState,useEffect} from "react";
import { Button,notification,Card,Col,Row,List, message, Avatar, Spin} from "antd";

import { logout } from "../../auth/localStorage";
import { PerfilCristianAdmin } from "./PerfilCristianAdmin";
import { PerfilEmpleado } from "./PerfilEmpleado";
import axiosURL from "../../config/axiosURL";

export const Perfil = ({ history }) => {
  const id = localStorage.getItem('uid')
  const tipo = localStorage.getItem("type");
  const  [state, setState] = useState({
    data:[],
    loading:false,
    hasMore:true
  })
  const handleLogout = async() => {
    await axiosURL.put(`/cs/${id}`,{conectado:'NO'})
    logout();
    history.push("/login");
  };
 /*  const pg= PeticionGET(`/${id}`)
  console.log(pg.anticipo?.[0].estado==='aprobado');
  if(pg.anticipo?.[0].estado==='aprobado'){

 

    notification.open({
      message: 'Notification Title',
      description:
        'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
      onClick: () => {
        console.log('Notification Clicked!');
      },
    }); */
  

    
/* }, []) */
  return (
    <>
   
      {tipo === "Gerente" ? <PerfilCristianAdmin /> : <PerfilEmpleado />}
      <Button onClick={handleLogout}>Salir</Button>
    </>
  );
};

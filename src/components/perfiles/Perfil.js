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
    
/* }, []) */
  return (
    <>
   
      {tipo === "Gerente" ? <PerfilCristianAdmin /> : <PerfilEmpleado />}
    </>
  );
};

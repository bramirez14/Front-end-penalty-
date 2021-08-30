import React,{useContext} from 'react'
import { Link } from "react-router-dom";
import { Badge, Button } from "antd";
import { FaBell } from "react-icons/fa";
import { UserContext } from '../../contexto/UserContext';
import "./alerta.css";
import { PeticionGET } from '../../config/PeticionGET';


export const Alerta = () => {
  const {alertas,nuevasAlertas} = useContext(UserContext);
  console.log(alertas);
  const id = localStorage.getItem('uid');
  const usuario = PeticionGET(`/${id}`);
   const filtroEmail = alertas.filter( a => a.receptor === usuario?.email );
   const filtroActiva = filtroEmail.filter( f => f.estado === 'activa' )
   console.log(filtroActiva);
  return (
    <Link to="/mensajes">
        <Button /* onClick={openNotification} */ className="boton-campana">
          <Badge count={filtroActiva.length}>
            <span className="head-example" />
            <FaBell className="icon-campana" />
          </Badge>
        </Button>
      </Link>
  )
}

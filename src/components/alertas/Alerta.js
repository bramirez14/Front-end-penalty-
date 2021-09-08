import React,{useState,useContext} from 'react'
import { Badge, Button, Dropdown } from "antd";
import { FaBell } from "react-icons/fa";
import "./alerta.css";
import { Mensajes } from '../mensajes/Mensajes';
import { SocketContext } from '../../context/SocketContext';
import { PeticionGET } from '../../config/PeticionGET';


export const Alerta = () => {
  const [mostrar, setMostrar] = useState(false)
  const { socket,alertas} = useContext(SocketContext)
  const id = localStorage.getItem('uid');
  const usuario = PeticionGET(`/${id}`);
  const filtroEmail = alertas?.filter( a => a.receptor === usuario?.email );
  const filtroActiva = filtroEmail.filter( f => f.estado === 'activa' ) 
  const menu = (
   
       <Mensajes alertas={alertas} socket={socket}/>

     
  );
  const abrirCerrarAlerta=() => setMostrar(!mostrar)
  return (
    <>
<Dropdown overlay={menu} trigger={['hover']} >
<Button  className="boton-campana" onClick={abrirCerrarAlerta} >
          <Badge count={filtroActiva?.length}>
            <span className="head-example" />
            <FaBell className="icon-campana" />
          </Badge>
        </Button>
  </Dropdown>
      </> 
  )
}

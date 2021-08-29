import React,{useContext} from 'react'
import { Link } from "react-router-dom";
import { Badge, Button } from "antd";
import { FaBell } from "react-icons/fa";
import { UserContext } from '../../contexto/UserContext';
import "./alerta.css";


export const Alerta = () => {
  const {alertas,nuevasAlertas} = useContext(UserContext)

  return (
    <Link to="/mensajes">
        <Button /* onClick={openNotification} */ className="boton-campana">
          <Badge count={alertas.length}>
            <span className="head-example" />
            <FaBell className="icon-campana" />
          </Badge>
        </Button>
      </Link>
  )
}

import React from 'react'
import { Listo } from '../perfiles/helpers/funcionesTarjeta';
import { Link } from "react-router-dom";
import { Badge, Button } from "antd";
import { FaBell } from "react-icons/fa";
import "./alerta.css";
import { PeticionGET } from '../../config/PeticionGET';

export const Alerta905 = () => {

  const listogasto =Listo('/gastos');
  const listokm=Listo('/todos/kilometros');
  const listosueldo=Listo('anticipo')
/**Sector respuesta */
const id= localStorage.getItem('uid');
const { anticipo,gasto,vacacion,kilometro } = PeticionGET(`/${id}`);
const filtroAnt = anticipo?.filter((a) => a.fd!==null);
const filtroGasto = gasto?.filter((a) => a.fd!==null);
const filtroVacacion = vacacion?.filter((a) => a.fd!==null);
const filtrokilometro= kilometro?.filter((a) => a.fd!==null)

const  respuesta= (filtroAnt,filtroGasto,filtrokilometro,filtroVacacion===undefined )?undefined:[...filtroAnt,...filtroGasto,...filtroVacacion,...filtrokilometro]
const todos905=respuesta===undefined?'':[...listogasto,...listokm,...listosueldo,...respuesta];
console.log(todos905);
    return (
        <Link to="/mensajes">
        <Button /* onClick={openNotification} */ className="boton-campana">
          <Badge count={todos905?.length}>
            <span className="head-example" />
            <FaBell className="icon-campana" />
          </Badge>
        </Button>
      </Link>
    )
}

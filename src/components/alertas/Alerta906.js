import React from 'react'
import { PagoAntGasto, PagoAntSueldo, PagosKm } from '../perfiles/helpers/funcionesTarjeta';
import { Link } from "react-router-dom";
import { Badge, Button } from "antd";
import { FaBell } from "react-icons/fa";
import "./alerta.css";
import { PeticionGET } from '../../config/PeticionGET';

export const Alerta906 = () => {
const pagosueldo= PagoAntSueldo();
const pagokm=PagosKm();
const pagogasto=PagoAntGasto();


/**Sector respuesta */
const id= localStorage.getItem('uid');
const { anticipo,gasto,vacacion,kilometro } = PeticionGET(`/${id}`);
const filtroAnt = anticipo?.filter((a) => a.fd!==null);
const filtroGasto = gasto?.filter((a) => a.fd!==null);
const filtroVacacion = vacacion?.filter((a) => a.fd!==null);
const filtrokilometro= kilometro?.filter((a) => a.fd!==null)

const  respuesta= (filtroAnt,filtroGasto,filtrokilometro,filtroVacacion===undefined )?undefined:[...filtroAnt,...filtroGasto,...filtroVacacion,...filtrokilometro]
    const todos906=respuesta===undefined?'':[...pagosueldo,...pagokm,...pagogasto,...respuesta];
    return (
        <Link to="/mensajes">
        <Button /* onClick={openNotification} */ className="boton-campana">
          <Badge count={todos906?.length}>
            <span className="head-example" />
            <FaBell className="icon-campana" />
          </Badge>
        </Button>
      </Link>
    )
}

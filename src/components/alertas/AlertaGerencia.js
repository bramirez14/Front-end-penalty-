import React,{ useState} from 'react'
import { Get, GetGastosConAnt, GetGastosSinAnt, KmPendiente } from '../perfiles/helpers/funciones';
import { Link } from "react-router-dom";
import { Badge, Button } from "antd";
import { FaBell } from "react-icons/fa";
import "./alerta.css";
import { PeticionGET } from '../../config/PeticionGET';

export const AlertaGerencia = () => {
const anticipos = Get('/anticipo'); 

const vacaciones = Get('/vacaciones'); 
const gastosConAnt= GetGastosConAnt('/gastos'); 
const  gastosSinAnt= GetGastosSinAnt('/gastos'); 
const km= KmPendiente('/todos/kilometros');
/**Sector respuesta */
const id= localStorage.getItem('uid');
const { anticipo,gasto,vacacion,kilometro } = PeticionGET(`/${id}`);
const filtroAnt = anticipo?.filter((a) => a.fd!==null);
const filtroGasto = gasto?.filter((a) => a.fd!==null);
const filtroVacacion = vacacion?.filter((a) => a.fd!==null);
const filtrokilometro= kilometro?.filter((a) => a.fd!==null)

const  respuesta= (filtroAnt,filtroGasto,filtrokilometro,filtroVacacion===undefined )?undefined:[...filtroAnt,...filtroGasto,...filtroVacacion,...filtrokilometro]
const todosgtes= respuesta===undefined?undefined:[...anticipos,...vacaciones,...gastosConAnt,...gastosSinAnt,...km,...respuesta]
const filtroInactiva= todosgtes?.filter(t=>t.notificacion ==='inactiva')
return (
        <Link to="/mensajes">
        <Button /* onClick={openNotification} */ className="boton-campana">
          <Badge count={filtroInactiva?.length}>
            <span className="head-example" />
            <FaBell className="icon-campana" />
          </Badge>
        </Button>
      </Link>
    )
}

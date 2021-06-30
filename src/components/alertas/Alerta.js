import React, { useState, useEffect, useRef } from "react";
import { Badge, Button } from "antd";
import { FaBell } from "react-icons/fa";
import { FaBullhorn } from "react-icons/fa";
import "./alerta.css";
import { PeticionGET } from "../../config/PeticionGET";
import { axiosURL } from "../../config/axiosURL";
import { run } from "../helper/funciones";
import {Link} from 'react-router-dom'

export const Alerta = () => {
  const [state, setState] = useState();
  /* alerta de anticipo */
  const id = localStorage.getItem("uid");
  const { anticipo,vacacion,gasto} = PeticionGET(`/${id}`);

/**Alerta de anticipo de sueldo */
  const notificacionSueldo = anticipo?.filter(
    (a) => a.notificacion === "inactiva"
  );
  const notificacionVacaciones = vacacion?.filter(
    (b) => b.notificacion === "inactiva"
  );
  const notificacionGastos = gasto?.filter(
    (c) => c.notificacion === "inactiva"
  );
   
   const estadoId= (notificacionSueldo,notificacionVacaciones,notificacionGastos===undefined)?'':[...notificacionGastos,...notificacionSueldo,...notificacionVacaciones]
   const estadoPorSector= (notificacionSueldo,notificacionVacaciones,notificacionGastos===undefined)?'':[[...notificacionSueldo],[...notificacionVacaciones],[...notificacionGastos]]
/** Longuitud tota de las alertas  */
 const numberTotal = estadoId?.length;
  /**Envio a la DB */
  const openNotification = async () => {
    /* setState(true); */
    let result= await axiosURL.put("/alerta",estadoPorSector);
    setState(result.data);
  };
 
console.log(state);
  return (
    <>
      <Button
        onClick={openNotification}
        style={{ backgroundColor: "transparent", border: "none" }}
      >
        <Link to='/mensajes'>
       
        <Badge count={ state==='ok'?0:numberTotal}>
          <span className="head-example" />

          <FaBell className="icon-campana" />
        </Badge>
        </Link>
      </Button>

      
    </>
  );
};

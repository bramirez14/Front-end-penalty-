import React, { useState} from "react";
import { PeticionGET } from "../../config/PeticionGET";
import { axiosURL } from "../../config/axiosURL";
import { Link } from "react-router-dom";
import { Badge, Button } from "antd";
import { FaBell } from "react-icons/fa";
import "./alerta.css";

export const Alerta = () => {
  const [state, setState] = useState();
  /* alerta de anticipo */
  const id = localStorage.getItem("uid");
  const { anticipo, vacacion, gasto } = PeticionGET(`/${id}`);

  /**Alerta de anticipo de sueldo */
  const notificacionSueldo = anticipo?.filter(
    (a) => a.notificacion === "inactiva"
  );
  /**Alerta de anticipo de vacaciones */
  const notificacionVacaciones = vacacion?.filter(
    (b) => b.notificacion === "inactiva"
  );
  /**Alerta de anticipo de gastos */
  const notificacionGastos = gasto?.filter(
    (c) => c.notificacion === "inactiva"
  );
/**condicional para saber si hay un alerta y si hay se concatena con las otras alertas */
  const estadoId = (notificacionSueldo,
  notificacionVacaciones,
  notificacionGastos === undefined)
    ? ""
    : [...notificacionGastos, ...notificacionSueldo, ...notificacionVacaciones];
  const estadoPorSector = (notificacionSueldo,
  notificacionVacaciones,
  notificacionGastos === undefined)
    ? ""
    : [
        [...notificacionSueldo],
        [...notificacionVacaciones],
        [...notificacionGastos],
      ];
  /** Longuitud tota de las alertas  */
  const numberTotal = estadoId?.length;
  /**Envio a la DB */
  const openNotification = async () => {
    let result = await axiosURL.put("/alerta", estadoPorSector);
    setState(result.data);
  };
  return (
    <>
      <Link to="/mensajes">
        <Button onClick={openNotification} className="boton-campana">
          <Badge count={state === "ok" ? 0 : numberTotal}>
            <span className="head-example" />
            <FaBell className="icon-campana" />
          </Badge>
        </Button>
      </Link>
    </>
  );
};

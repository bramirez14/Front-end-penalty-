import React, { useState } from "react";
import { Badge, Button } from "antd";
import { FaBell } from "react-icons/fa";
import { FaBullhorn } from "react-icons/fa";

import "./alerta.css";
import PeticionGET from "../../config/PeticionGET";
import axiosURL from "../../config/axiosURL";

export const Alerta = () => {
  const [state, setState] = useState(false);
  const [toggle, setToggle] = useState(false)
  /* alerta de anticipo */
  const id = localStorage.getItem("uid");
  const { anticipo } = PeticionGET(`/${id}`);
  const filtroAprobado = anticipo?.filter((a) => a.estado === "aprobado");
  const filtroAprobadoeInactivo = anticipo?.filter(a=>  a.notificacion === "inactiva")
  const filtroId = filtroAprobadoeInactivo?.map((a) => a.id);
  const number = filtroAprobadoeInactivo?.length;
  const openNotification = async () => {
    setState(true);
    setToggle(!toggle)
    await axiosURL.put("/alerta", filtroId);
  };

  return (
    <>
      <Button
        onClick={openNotification}
        style={{ backgroundColor: "transparent", border: "none" }}
      >
        <Badge count={state === true ? 0 : number}>
          <span className="head-example" />
          <FaBell className="icon-campana" />
        </Badge>
      </Button>

    { toggle===true && <div
        className={number < 5 ? "contenedor-alerta" : "contenedor-alert-active"}
      >
        {filtroAprobado?.map((a) => (
          <>
            <div className="contenedor-item">
              <div className="circle"> </div>
              <div className="item-icon">
                <FaBullhorn className="icon-bocina" />
              </div>
              <div className="item-despcription"> hola soy una alerta </div>
            </div>
          </>
        ))}
      </div>}
    </>
  );
};

import React, { useState, useEffect,useRef } from "react";
import { Badge, Button } from "antd";
import { FaBell } from "react-icons/fa";
import { FaBullhorn } from "react-icons/fa";


import "./alerta.css";
import PeticionGET from "../../config/PeticionGET";
import axiosURL from "../../config/axiosURL";
import {  run } from "../helper/funciones";
/**Cierra cuadno clickeas fuera del div */
let useClickOutside = (handler) => {
  let domNode = useRef();
console.log(handler);
  useEffect(() => {
    let maybeHandler = (event) => {
     console.log(!domNode.current.contains(event.target))
      if (!domNode.current.contains(event.target)) {
        handler();
      }
    };

    document.addEventListener("mousedown", maybeHandler);

    return () => {
      document.removeEventListener("mousedown", maybeHandler);
    };
  });

  return domNode;
};

export const Alerta = () => {
  let [isOpen, setIsOpen] = useState(false);
  let domNode = useClickOutside(() => {
    setIsOpen(false);
  });
console.log(domNode);
  const [state, setState] = useState(false);
  const [toggle, setToggle] = useState(false);
  /* alerta de anticipo */
  const id = localStorage.getItem("uid");
  const { anticipo } = PeticionGET(`/${id}`);
  const filtroAprobado = anticipo?.filter((a) => a.estado === "aprobado");
  const filtroAprobadoeInactivo = anticipo?.filter(
    (a) => a.notificacion === "inactiva"
  );
  const filtroId = filtroAprobadoeInactivo?.map((a) => a.id);
  const number = filtroAprobadoeInactivo?.length;
  const openNotification = async () => {
    setState(true);
    setToggle(!toggle);
    await axiosURL.put("/alerta", filtroId);
  };

  const content = filtroAprobado?.map((a) => (
    <div className="contenedor-item" key={a.id}>
      <div className="circle"></div>
      <div className="item-icon">
        <FaBullhorn className="icon-bocina" />
      </div>
      <div className="contenedor-inf">
        <div className="item-despcription">
          {" "}
          <span>Estado: {a.estadoFinal} </span>
        </div>
        <div className="item-despcription">
          {" "}
          <span> mensaje: {a.respMensaje} </span>
        </div>
        <div className="item-despcription">
          {" "}
          <span style={{color:'#46a461'}}>hace { run(a.f)}</span>
        </div>
      </div>
    </div>
  ));
 
  return (
    <>

      <Button
       onClick={() => setIsOpen((isOpen) => !isOpen)}
       ref={domNode}
        style={{ backgroundColor: "transparent", border:'none'}}
      >
        <Badge count={state === true ? 0 : number} >
          <span className="head-example" />
          
       <FaBell className='icon-campana'/>
     
        </Badge>
      </Button>

      {isOpen === true && (
        <div
          className={
            number < 5 ? "contenedor-alerta" : "contenedor-alert-active"
          }
        >
          {content}
        </div>
      )}
    
    </>
  );
};

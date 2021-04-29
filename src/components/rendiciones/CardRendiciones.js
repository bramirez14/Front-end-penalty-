import React from "react";
import "./css/cardRendiciones.css";
import image from "../../logoPenalty-remove.png";
import { Button } from "antd";
import { categorias } from "./categorias";
export const CardRendiciones = ({imagen,categoria,importe,fecha,notas}) => {
  return (
    <div className="list-container">
      <div className="img-div">
        <img className="img" src={imagen} alt="" />
      </div>
      <div className="text-date">
       <h4>{categoria}</h4>
       <div><span>$ {importe}</span></div>
       <div><span> fecha:{fecha} </span></div>
      </div>
      <div className='nota'><span>Descripcion:<br/>{notas} </span > </div>
      <Button>Editar</Button>
    </div>
  );
};

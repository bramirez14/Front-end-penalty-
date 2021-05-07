import React from "react";
import "./css/cardRendiciones.css";
import { Button } from "antd";
import {Link} from 'react-router-dom'
export const CardRendiciones = ({imagen,categoria,importe,fecha,notas,id}) => {
 
  return (
    <div className="list-container">
      <div className="img-div">
        <img className="img" src={imagen} alt="" />
      </div>
      <div className="text-date">
       <h4>{categoria}</h4>
       <div><span>$ {importe}</span></div>
       <div><span> fecha de ingreso: {fecha} </span></div>
      </div>
      <div className='nota'><span>Descripcion:<br/>{notas} </span > </div>
      <Link
    to={`/editar/rendicion/${id}`}>
      <Button
        style={{ width: "auto",  marginTop:'10px',borderRadius:'10px'}}
      >
        {" "}
      Editar
      </Button>
      </Link>
    </div>
  );
};

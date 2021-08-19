import React from "react";
import { MensajesGerencia } from "./MensajesGerencia";
import { Mensaje905 } from "./Mensaje905";
import { Mensajes906 } from "./Mensajes906";
import { Mensajes0000 } from "./Mensajes0000";
import "./mensajes.css";

export const Mensajes = () => {
const N = localStorage.getItem('N')
  return (
    <>
    {
      N === '901' || N === '902' || N === '903'?
      <MensajesGerencia/>
      :
      N === '905'?
      <Mensaje905/>
      :
      N === '906'?
      <Mensajes906/>
      :
      <Mensajes0000/>
    
    }
    </>
  );
};

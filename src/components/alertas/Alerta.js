import React from "react";
import { Alerta0000 } from "./Alerta0000";
import { Alerta905 } from "./Alerta905";
import { Alerta906 } from "./Alerta906";
import { AlertaGerencia } from "./AlertaGerencia";

export const Alerta = () => {
const N = localStorage.getItem('N')
/* const todos=[...todosgtes,...todos905,...todos906];
console.log(todos); */

  /** Longuitud tota de las alertas  */
  //const numberTotal = estadoId?.length;
  /**Envio a la DB */
 /*  const openNotification = async () => {
    let result = await axiosURL.put("/alerta", estadoPorSector);
    setState(result.data);
  }; */
  return (
    <>
    {
      N === '901' || N === '902' || N === '903'?
      <AlertaGerencia/>
      :
      N === '905'?
      <Alerta905/>
      :
      N === '906'?
      <Alerta906/>
      :
      <Alerta0000/>
    
    }
    </>
  );
};

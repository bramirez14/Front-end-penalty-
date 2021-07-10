import React, { Children } from "react";
import { Link } from "react-router-dom";
import { PeticionGET } from "../../config/PeticionGET";

const Funtion = () => {
  const get = PeticionGET("/gastos");
  console.log(get);
  const filtroRendicionTerminada = get.filter((g) => g.listo==='Si' && g.procesoFinalizado!=='Si');
  console.log(filtroRendicionTerminada);
  return (
    <>
      {filtroRendicionTerminada.length > 0 ? (
        <h2>Pendiente: {filtroRendicionTerminada.length}</h2>
      ) : (
        <p>No hay notificaciones!!!</p>
      )}
    </>
  );
};

const Construccion=()=><p>Construccion!!!</p>
export const TarjetasItems905 = [
  
  {
    title: "Rendicion de Gasto",
    extra: <Link to="/comprobante/rendicion">More</Link>,
    children: <Funtion />,
    
  },

  {
    title: "En contruccion",
    extra: <Link to="/comprobante/rendicion">More</Link>,
    children: <Construccion />,
  },
  {
    title: "En contruccion",
    extra: <Link to="/comprobante/rendicion">More</Link>,
    children: <Construccion />,
  },
  {
    title: "En contruccion",
    extra: <Link to="/comprobante/rendicion">More</Link>,
    children: <Construccion />,
  },
];

export const TarjetasItems906 =[
  {
    title: "Pagos de Ant.Sueldo",
    extra: <Link to="/pagos/anticipo">More</Link>,
    children: <Funtion />,
    
  },

  {
    title: "Pagos de Ant.Gasto",
    extra: <Link to="/pagos/gasto">More</Link>,
    children: <Funtion  />,
  },
  {
    title: "En contruccion",
    extra: <Link to="/comprobante/rendicion">More</Link>,
    children: <Construccion />,
  },
  {
    title: "En contruccion",
    extra: <Link to="/comprobante/rendicion">More</Link>,
    children: <Construccion />,
  },
] 

export const TarjetasItems0000=[
  {
    title: "En contruccion",
    extra: <Link to="/comprobante/rendicion">More</Link>,
    children: <Construccion />,
  },

  {
    title: "En contruccion",
    extra: <Link to="/comprobante/rendicion">More</Link>,
    children: <Construccion />,
  },
  {
    title: "En contruccion",
    extra: <Link to="/comprobante/rendicion">More</Link>,
    children: <Construccion />,
  },
  {
    title: "En contruccion",
    extra: <Link to="/comprobante/rendicion">More</Link>,
    children: <Construccion />,
  },
] 
import {  PeticionGETIntranetCobranzas } from "../../../config/PeticionGET";

export const filtradoPorVendedorCobranzas = (url) => {
  const N = localStorage.getItem("N");
  const getDB = PeticionGETIntranetCobranzas(url);
 if (getDB?.parent?.fatal===true) {
   alert('No hay internert')
 }else{ 
   const filtroVendedor = getDB?.filter((t) => t.vendedor === N);
   let filtrado;
    if (
      N === "0000"||
      N === "905" ||
      N === "906" ||
      N === "903" ||
      N === "902" ||
      N === "901" ||
      N === "907"||
      N === "908"
    ) {
      filtrado = getDB;
    } else {
      filtrado = filtroVendedor;

    }
    return filtrado;

 }
    

};
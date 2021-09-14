import {  PeticionGETIntranetCobranzas } from "../../../config/PeticionGET";

export const filtradoPorVendedorCobranzas = (url) => {
  const N = localStorage.getItem("N");
  let filtrado;
  const getDB = PeticionGETIntranetCobranzas(url);
 
    const filtroVendedor = getDB.filter((t) => t.vendedor === N);

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
};
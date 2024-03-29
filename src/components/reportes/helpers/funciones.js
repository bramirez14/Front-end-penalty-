import { PeticionGET } from "../../config/PeticionGET";

export const filtradoPorVendedor = (url) => {
  const N = localStorage.getItem("N");
  let filtrado;
  const getDB = PeticionGET(url);
  if (!!getDB?.original) {
   
  } else {
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
  }

  return filtrado;
};

export const  numberWithCommas = (x) =>{ 
  const valorNumerico = parseFloat(x).toFixed(2)
  const valor= valorNumerico.replace('.', ',');
  return valor.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

export const filtradoPorVendedorSQL = (url) =>{
const N = localStorage.getItem("N");
  let filtrado;
  const getDB = PeticionGET(url);
 
  const filtroVendedor = getDB.filter((t) => t.VENDEDOR === N);
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

export const dateFormatDDMMYYYY=(date)=>{
  const newDate= new Date(date)
  const year= newDate.getFullYear();
  const month = newDate.getMonth();
  const day = newDate.getDate();
  return `${day}/${month}/${year}`
}
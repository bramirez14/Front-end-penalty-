import { PeticionGETIntranet } from "../../../config/PeticionGET";

export const filtradoPorVendedor = (url) => {
  const N = localStorage.getItem("N");
  let filtrado;
  const getDB = PeticionGETIntranet(url);
  if (!!getDB?.original) {
    console.log(getDB);
    console.log(!!getDB.original);
  } else {
    const filtroVendedor = getDB.filter((t) => t.vendedor === N);

    if (
      N === "0000"||
      N === "905" ||
      N === "906" ||
      N === "903" ||
      N === "902" ||
      N === "901" ||
      N === "907"
    ) {
      filtrado = getDB;
    } else {
      filtrado = filtroVendedor;
    }
  }

  return filtrado;
};


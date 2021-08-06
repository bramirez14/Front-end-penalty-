import Swal from "sweetalert2/dist/sweetalert2.js";
import { axiosURL } from "../../config/axiosURL";

export const sinAnticipo906 = (array) => {
  const anticipo = array.filter(
    (c) =>
      c.sinAnticipo === "sin" &&
      c.listo === "Si" &&
      c.estadoFinal === "aprobado"
  );
  const anticipoFinalizado905 = anticipo.filter(
    (c) => c.procesoFinalizado === "Si"
  ); //porceso que finaliza el usuario 905
  return anticipoFinalizado905;
};
export const conAnticipo906 = (array) => {
  const anticipo = array.filter(
    (c) => c.sinAnticipo !== "sin" && c.estadoFinal === "aprobado"
  );
  //porceso que finaliza el usuario 905
  return anticipo;
};
export const finalizar = async (id, callBack, state, setState) => {
  if (state === "") {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Ingrese un archivo pdf!",
    });
  }
  const obj = {
    pagoRealizado: "Si",
  };
  const f = new FormData();
  f.append("file", state);
  f.append("pagoRealizado", obj.pagoRealizado);
  await axiosURL.put(`/pago/gasto/${id}`, f);
  setState("");
  callBack();
};
export const enCurso = async (id, callBack) => {
  await axiosURL.put(`/pago/encurso/${id}`, { pagoRealizado: "En curso" });
  callBack();
};

import Swal from "sweetalert2/dist/sweetalert2.js";
import { axiosURL } from "../../config/axiosURL";

export const sinAnticipo906 = (array) => {
  const anticipo = array.filter(
    (c) =>
      c.sinAnticipo == "sin" &&
      c.listo == "Si" &&
      c.estado == "aprobado"
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
export const finalizar = async (id, callBack, state, setState,statefinal,setStatefinal) => {
  
  if (state === '') {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Ingreses los  archivo pdf!",
    });
  }else if (statefinal===''){
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Ingreses los  archivo pdf!",
    });


  }else{
    const obj = {
    pagoRealizado: "Si",
  };
    const f = new FormData();
    f.append("file", state);
    f.append("pagoRealizado", obj.pagoRealizado);
    await axiosURL.put(`/pago/gasto/${id}`, f);
    await finalizarfinal(id,statefinal)

    setState("");
    setStatefinal("");
   callBack();
   Swal.fire({
    position: 'center',
    icon: 'success',
    title: 'se guardo con exito!!!',
    showConfirmButton: false,
    timer: 1500
  })

  }
  
};
const finalizarfinal=async (id,statefinal) =>{
  const final = new FormData();
  final.append("file",statefinal);
  const  result= await axiosURL.put(`/pagofinal/${id}`, final);
  console.log(result);
}



export const enCurso = async (id, callBack) => {
  await axiosURL.put(`/pago/encurso/${id}`, { pagoRealizado: "En curso" });
  callBack();
};

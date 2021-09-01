import { useState, useEffect } from "react";
import { axiosURL } from "../../config/axiosURL";
import { saveAs } from "file-saver";
import { PeticionGET } from "../../config/PeticionGET";

export const TodosGastos = (data) => {
  const N = localStorage.getItem("N"); // numero de registro
  const getGastos = data;
  const gastosSinAnt = getGastos.filter(
    (d) => d.sinAnticipo === "sin" && d.listo === "Si"
  );
  const gastosConAnt = getGastos.filter((d) => d.sinAnticipo !== "sin");
  let usuariosConAnt;
  let usuariosSinAnt;
  /**Sector 901  */
  if (N === "901") {
    usuariosSinAnt = gastosSinAnt.filter(
      (d) => d.usuario.departamentoId === 1 || d.usuario.departamentoId === 2
    );
    usuariosConAnt = gastosConAnt.filter(
      (d) => d.usuario.departamentoId === 1 || d.usuario.departamentoId === 2
    );
  }
  /**Sector 902  */
  if (N === "902") {
    usuariosSinAnt = gastosSinAnt.filter(
      (d) => d.usuario.departamentoId === 5 || d.estado === "aprobado"
    );
    usuariosConAnt = gastosConAnt.filter(
      (d) => d.usuario.departamentoId === 5 || d.estado === "aprobado"
    );
  }
  /**Sector 903 */
  if (N === "903") {
    usuariosSinAnt = gastosSinAnt.filter(
      (d) => d.usuario.departamentoId === 4 || d.usuario.departamentoId === 3
    );
    usuariosConAnt = gastosConAnt.filter(
      (d) => d.usuario.departamentoId === 4 || d.usuario.departamentoId === 3
    );
  }
  const gastoTotal = [...usuariosSinAnt, ...usuariosConAnt];

  return gastoTotal;
};

export const GetFiltroGerencia = (array) => {
  const N = localStorage.getItem("N");
  /**selecion de gerente  recordamos que Cristian Rios da el ok final*/
  const data = array;
  console.log(data);
  const dataPendiente = data.filter((d) => d.estado === "pendiente" || d.id);
  let filtro;
  /**usuario901 */
  if (N === "901") {
    filtro = dataPendiente.filter(
      (r) => r.usuario.departamentoId === 1 || r.usuario.departamentoId === 2
    );
  }
  /**usuario902 */
  if (N === "902") {
    filtro = data.filter(
      (r) => r.usuario.departamentoId === 5 || r.estado === "aprobado"
    );
  }
  /**usuario903*/
  if (N === "903") {
    filtro = data.filter(
      (r) => r.usuario.departamentoId === 3 || r.usuario.departamentoId === 4
    );
  }

  return filtro;
};

export const descargarPDF = async (pdf) => {
  let res = await axiosURL.get("/pdf/gastos/rendicion", {
    headers: { archivo: pdf },
    responseType: "blob",
  });
  const pdfBlob = await new Blob([res.data], { type: "application/pdf" });
  saveAs(pdfBlob, `${pdf}`);
};

export const alertaGerencia = async (obj) =>{
  const mailEmpleado = obj.usuario.email;
  const mailGerente = obj.gerente.email;
  const nuevoObj = {
    alerta: `${obj.msj}, Estado: ${obj.estado}`,
    info: obj.info,
    nombre:`${obj.nombre} ${obj.apellido}`,
    f: new Date().toLocaleString(),
    emisor: mailGerente,
    receptor: mailEmpleado,
    estado:'activa',
    path:obj.path,
    usuarioId:obj.id
  };
  const res = await axiosURL.post("/msg/alerta", nuevoObj);
  return res;
}
export const alerta905= async (array) =>{
  console.log(array);
  for (const iterator of array) {
    const nuevoObj = {
    alerta: `${iterator.alerta}`,
    info: iterator.info,
    nombre:`${iterator.nombre} ${iterator.apellido}`,
    f: new Date().toLocaleString(),
    emisor: iterator.emisor,
    receptor: iterator.receptor,
    estado:'activa',
    path:iterator.path,
    usuarioId:iterator.id
  };
   await axiosURL.post("/msg/alerta", nuevoObj);
  }
  
}
export const alerta902= async(obj) => {
  console.log(obj);
  const mailEmpleado = 'cristian.rios@penalty.com.ar';
  const mailGerente = obj.gerente.email;
  const nuevoObj = {
    alerta: `${obj.msj}, Estado: ${obj.estado}`,
    info: obj.info,
    nombre:`${obj.nombre} ${obj.apellido}`,
    f: new Date().toLocaleString(),
    emisor: mailGerente,
    receptor: mailEmpleado,
    estado:'activa',
    path:obj.path,
    usuarioId:obj.id
  };
  console.log(nuevoObj);
  const res = await axiosURL.post("/msg/alerta", nuevoObj);
  return res;
}
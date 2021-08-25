import React from "react";
import "./css/aprob.css";
import { GetFiltroGerencia } from "./helpers/funciones";
import { ColumnasSueldo} from "./columnas/columnasSueldo";
import { HelperTABLEobj } from "../helpers/HelperTABLEobj";

export const AprobacionAntcipoSueldo = () => {
 const[columnasSueldo,data]=ColumnasSueldo()
//filtro generencia viene de los helpers
  const datos = GetFiltroGerencia(data)?.map((f) => {
    return {
      ...f,
      key: f.id,
      nombre: f.usuario.nombre,
      apellido: f.usuario.apellido,
    };
  });
  return (
    <HelperTABLEobj
    hoja={"Aprobaciones de Sueldos"}
    namefile={"Aprobaciones de Sueldos"}
    columns={columnasSueldo}
    data={datos}
    paginas={true}
    boton={true}
    y={400}
    />
     
  );
};
import React from "react";
import "./css/aprob.css";
import { GetFiltroGerencia } from "./helpers/funciones";
import { HelperTABLE } from "../helpers/HelperTABLE";
import { ColumnasSueldo} from "./columnas/columnasSueldo";

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
    <HelperTABLE
    columns={columnasSueldo}
    data={datos}
    paginas={true}
    y={400}
    />
     
  );
};
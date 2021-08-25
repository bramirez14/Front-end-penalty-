import React from "react";
import {PeticionGET} from "../config/PeticionGET";
import { GetFiltroGerencia } from "./helpers/funciones";
import { ColumnasVacaciones } from "./columnas/columnasVacaciones";
import "./css/aprob.css";
import { HelperTABLEobj } from "../helpers/HelperTABLEobj";

export const AprobacionVacaciones = () => {
const [columnasVacaciones,data]=ColumnasVacaciones()
  const dtos = PeticionGET("/departamentos");// peticion get para traer todos los departamentos 
//filtro generencia viene de los helpers
  const datos = GetFiltroGerencia(data)?.map((f) => {
    let buscardtoId = dtos?.find((d) => d.id === f.usuario.departamentoId);//usuario filtrado por dto
    return {
      ...f,
      key: f.id,
      nombre: f.usuario.nombre,
      apellido: f.usuario.apellido,
      departamento: buscardtoId?.departamento,
    };
  });
    return (
    <HelperTABLEobj
    hoja={"Aprobaciones de Vacaciones"}
    namefile={"Aprobaciones de Vacaciones"}
    columns={columnasVacaciones}
    data={datos}
    paginas={true}
    boton={true}
    y={400}
    />
    )
}

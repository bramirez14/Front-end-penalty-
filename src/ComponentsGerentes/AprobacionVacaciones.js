import React from "react";
import {PeticionGET} from "../config/PeticionGET";
import { GetFiltroGerencia } from "./helpers/funciones";
import { HelperTABLE } from "../helpers/HelperTABLE";
import { ColumnasVacaciones } from "./columnas/columnasVacaciones";
import "./css/aprob.css";

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
    <HelperTABLE
    columns={columnasVacaciones}
    data={datos}
    paginas={true}
    y={400}

    />
    )
}

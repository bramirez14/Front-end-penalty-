import React from "react";
import {PeticionGET} from "../config/PeticionGET";
import { descargarPDF, GetFiltroGerencia } from "./helpers/funciones";
import { ColumnasVacaciones } from "./columnas/columnasVacaciones";
import "./css/aprob.css";
import { HelperTABLEobj } from "../helpers/HelperTABLEobj";
import { Button, Descriptions } from "antd";
import { BiDownload } from "react-icons/bi";
import { colVacaExcel } from "./columnas/columnasExcel/columnasVacacionesExcel";

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
      description: (
        <Descriptions title={`Info ${f.id}`} style={{border:' solid 2px #ddd', padding:20}}>
        <Descriptions.Item label="Periodo"><b>{f.periodo}</b></Descriptions.Item>
        <Descriptions.Item label="Fecha de Solicitud"><b>{f.fechaSolicitud}</b></Descriptions.Item>
        <Descriptions.Item label="Fecha de Desde"><b>{f.fechaDesde}</b></Descriptions.Item>
        <Descriptions.Item label="Fecha de Hasta"><b>{f.fechaHasta}</b></Descriptions.Item>
        <Descriptions.Item label="Mensaje"><b>{f.obs}</b></Descriptions.Item>
        <Descriptions.Item label="Faltantes"><b>{f.diasFaltantes}</b></Descriptions.Item>
      </Descriptions>

      )
    };
    
  });

  const prueba= datos.map(d=>  Object.values(d) )
  console.log(prueba,'line 37');
  const colunaExcel=
  datos.map(d=>{return{
    
        title:Object.values(d),
        dataIndex: Object.keys(d),

  }})  
  console.log(colunaExcel,'line 46');


    return (
    <HelperTABLEobj
    hoja={"Aprobaciones de Vacaciones"}
    namefile={"Aprobaciones de Vacaciones"}
    columns={columnasVacaciones}
    data={datos.reverse()}
    paginas={true}
    boton={true}
    bordered={true}
    expandible={true}
    y={400}
    colExcel={colVacaExcel}
    />
    )
}

import React,{useState} from "react";
import {PeticionGET} from "../config/PeticionGET";
import { descargarPDF, GetFiltroGerencia } from "./helpers/funciones";
import { ColumnasVacaciones } from "./columnas/columnasVacaciones";
import "./css/aprob.css";
import { HelperTABLEobj } from "../helpers/HelperTABLEobj";
import { Button, Col, Descriptions, Row, Switch } from "antd";
import { BiDownload } from "react-icons/bi";
import { colVacaExcel } from "./columnas/columnasExcel/columnasVacacionesExcel";

export const AprobacionVacaciones = () => {
  const [state, setState] = useState(false);
  const N = localStorage.getItem("N");
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

  let filtrofinalizados;
  let filtropendientes;
  if(N === '902'){
    filtropendientes = datos.filter(d=>d.estadoFinal==='pendiente')
    
    filtrofinalizados = datos.filter(d=>d.estadoFinal==='aprobado' || d.estadoFinal === 'rechazado')
  }else{
  filtropendientes = datos.filter(d=>d.estado==='pendiente');
  filtrofinalizados = datos.filter(d=>d.estado==='aprobado' || d.estado === 'rechazado');
  }


    return (
      <>
        <Row style={{marginTop:20,marginBottom:20}}><Col span={24}>
    <Switch checkedChildren="Pendientes" unCheckedChildren="Listos" defaultChecked onChange={()=>setState(!state)} style={{marginRight:10}}/>
    </Col>
    </Row>
    <HelperTABLEobj
    hoja={"Aprobaciones de Vacaciones"}
    namefile={"Aprobaciones de Vacaciones"}
    columns={columnasVacaciones}
    data={state?filtrofinalizados.reverse():filtropendientes.reverse()}
    paginas={true}
    boton={true}
    bordered={true}
    expandible={true}
    y={400}
    colExcel={colVacaExcel}
    />
    </>
    )
}

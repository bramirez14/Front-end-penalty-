import React, { useState, useEffect } from "react";
import { descargarPDF, GetFiltroGerencia } from "./helpers/funciones";
import { ColumnasSueldo} from "./columnas/columnasSueldo";
import { HelperTABLEobj } from "../helpers/HelperTABLEobj";
import { Button, Descriptions, Switch, Row, Col} from "antd";
import { BiDownload } from "react-icons/bi";
import { colSueldoExcel } from "./columnas/columnasExcel/columnasSueldoExcel";
import {  CheckOutlined } from '@ant-design/icons'

export const AprobacionAntcipoSueldo = () => {
const N = localStorage.getItem('N')
const [state, setState] = useState(false)
 const[columnasSueldo,data]=ColumnasSueldo();
//filtro generencia viene de los helpers
  const datos = GetFiltroGerencia(data)?.map((f) => {
    return {
      ...f,
      key: f.id,
      nombre: f.usuario.nombre,
      apellido: f.usuario.apellido,
      description: (
        <Descriptions title={`Info ${f.id}`} style={{border:' solid 2px #ddd', padding:20}}>
        <Descriptions.Item label="Fecha de Solicitud"><b>{f.fecha}</b></Descriptions.Item>
        <Descriptions.Item label="Devolucion"><b>{f.sueldo}</b></Descriptions.Item>
        <Descriptions.Item label="Importe"><b>{f.importe}</b></Descriptions.Item>
        <Descriptions.Item label="Cuotas"><b>{f.cuotas}</b></Descriptions.Item>
        <Descriptions.Item label="Mensaje"><b>{f.mensaje}</b></Descriptions.Item>
       
        <Descriptions.Item label="PDF pagos">
        {
        f.pdfinal === null? <h5>No hay pdf!!!</h5>:
        <Button type="link" style={{border:'none',backgroundColor:'transparent'}} onClick={() => descargarPDF(f.pdfinal)}>
            <BiDownload/>
            </Button>
      }
        </Descriptions.Item>
        <Descriptions.Item label="PDF orden de pago final">
        {
        f.pdfpagoFinal === null? <h5>No hay pdf!!!</h5>:
        <Button type="link" style={{border:'none',backgroundColor:'transparent'}} onClick={() => descargarPDF(f.pdfpagoFinal)}>
            <BiDownload/>
            </Button>
      }
        </Descriptions.Item>
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


console.log(state,61);
  return (
    <>
    <Row style={{marginTop:20,marginBottom:20}}><Col span={24}>
    <Switch checkedChildren="Pendentes" unCheckedChildren="Listos" defaultChecked onChange={()=>setState(!state)} style={{marginRight:10}}/>

    </Col>
    </Row>
  
    <HelperTABLEobj
    hoja={"Aprobaciones de Sueldos"}
    namefile={"Aprobaciones de Sueldos"}
    columns={columnasSueldo}
    data={state?filtrofinalizados:filtropendientes}
    paginas={true}
    boton={true}
    bordered={true}
    expandible={true}
    colExcel={colSueldoExcel}
    y={400}
    />
    </>
     
  );
};
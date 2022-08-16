import React,{ useState } from "react";
import {
  Descriptions,
  Button,
  Row,
  Col,
  Switch,
} from "antd";
import "./css/aprob.css";
import { descargarPDF, TodosGastos } from "./helpers/funciones";
import { ColumnasGastos } from "./columnas/columnasGastos";
import { HelperTABLEobj } from "../helpers/HelperTABLEobj";
import { colGastosExcel } from "./columnas/columnasExcel/columnasGastosExcel";
import { BiDownload } from "react-icons/bi";
import { PeticionGET } from "../config/PeticionGET";
export const AprobacionGastos = () => {
  const N = localStorage.getItem('N')
  const [state, setState] = useState(false)
const [columnasGastos,data]=ColumnasGastos();
const formaDepago = PeticionGET("/mpagos");
const formaPago= (idpago) => {
const op= formaDepago.find(
          (f) => f.id === idpago
        );
  return op?.pago
        
}

const modoRendicion=( modo) => {
 if(modo==='sin'){
   return 'Sin Anticipo'
 }else{
   return 'Con Anticipo'
 }
   
}
// TodosGastos viene de helpers
  const datos = TodosGastos(data)?.map((f) => {
    return {
      ...f,
      key: f.id,
      nombre: f.usuario.nombre,
      apellido: f.usuario.apellido,
      
      
      description:  (
        <Descriptions title={`Info ${f.id}`} style={{border:' solid 2px #ddd', padding:20}}>
        <Descriptions.Item label="Fecha de Solicitud"><b>{f.fecha}</b></Descriptions.Item>
        <Descriptions.Item label="Forma de pago"><b>{formaPago(f.formapagoId)}</b></Descriptions.Item>
        <Descriptions.Item label="Rendicion"><b>{modoRendicion(f.sinAnticipo)}</b></Descriptions.Item>
        <Descriptions.Item label="Importe"><b>{f.importe}</b></Descriptions.Item>
        <Descriptions.Item label="Mensaje"><b>{f.notas}</b></Descriptions.Item>

        <Descriptions.Item label="PDF proveedores">
        {
        f.pdf === null? <h5>No hay pdf!!!</h5>:
        <Button type="link" style={{border:'none',backgroundColor:'transparent'}} onClick={() => descargarPDF(f.pdf)}>
            <BiDownload/>
            </Button>
      }
        </Descriptions.Item>
        <Descriptions.Item label="PDF pagos">
        {
        f.pdf === null? <h5>No hay pdf!!!</h5>:
        <Button type="link" style={{border:'none',backgroundColor:'transparent'}} onClick={() => descargarPDF(f.pdFinal)}>
            <BiDownload/>
            </Button>
      }
        </Descriptions.Item>
        <Descriptions.Item label="PDF orden de pago final">
        {
        f.pdf === null? <h5>No hay pdf!!!</h5>:
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
  return (
    <>
    <Row style={{marginTop:20,marginBottom:20}}><Col span={24}>
    <Switch checkedChildren="Pendientes" unCheckedChildren="Listos" defaultChecked onChange={()=>setState(!state)} style={{marginRight:10}}/>
    </Col>
    </Row>
  
  <HelperTABLEobj
      hoja={"Aprobaciones de Gastos"}
      namefile={"Aprobaciones de Gastos"}
      columns={columnasGastos}
      data={state?filtrofinalizados:filtropendientes}
      expandible={true}
      boton={true}
      paginas={true}
      y={400}
      colExcel={colGastosExcel}
      />
      </>
      )
      
};

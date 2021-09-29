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
  const [state, setState] = useState({
    estado:true,
    estadoFinal:true,
    
  })
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
        <Descriptions.Item label="Mensaje"><b>{f.mensaje}</b></Descriptions.Item>

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
  function onChange(checked) {
    setState({...state,estado:checked});
  }
  function onChangeF(checked) {
    setState({...state,estadoFinal:checked});
  }
  const filtroSeleccion=(data)=> {
    const rev= data?.reverse()
   
    if(state.estado===true){
      return rev?.filter(r=> r.estado==='pendiente');
    }else{
      return rev?.filter(r=> r.estado==='aprobado');
      
    }
  }
  const filtroSeleccion902=(data)=> {

    const rev= data?.reverse()
   
    if(state.estadoFinal===true){
      return rev?.filter(r=> r.estadoFinal==='pendiente');
    }else{
      return rev?.filter(r=> r.estadoFinal==='aprobado' || r.estadoFinal==='rechazado' );
      
    }
  }
  useEffect(() => filtroSeleccion(),[state])
  return (
    <>
    <Row style={{marginTop:20,marginBottom:20}}><Col span={24}>
       {N==='902'?'':<Switch checkedChildren="Pendentes" unCheckedChildren="Listos" defaultChecked onChange={onChange} style={{marginRight:10}}/>}
       <Switch checkedChildren="Pendientes" unCheckedChildren={<CheckOutlined />} defaultChecked  onChange={onChangeF} />

    </Col>
    </Row>
  
    <HelperTABLEobj
    hoja={"Aprobaciones de Sueldos"}
    namefile={"Aprobaciones de Sueldos"}
    columns={columnasSueldo}
    data={N==='902'?filtroSeleccion902(datos):filtroSeleccion(datos)}
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
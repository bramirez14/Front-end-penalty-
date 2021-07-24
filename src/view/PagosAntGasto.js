import React,{useState,useEffect} from 'react'
import { Button, Table, } from 'antd';
import { axiosURL } from '../config/axiosURL';
import { Modalgasto } from './helpers/Modalgasto';
import { saveAs } from "file-saver";

export const PagosAntGasto = ({history}) => {
  const [dataGasto, setDataGasto] = useState([])
  const [stateFile, setStateFile] = useState({
file:''
  })
const getGastos = async ()=>{
  const {data} = await axiosURL.get('/gastos')
  setDataGasto(data)
}
useEffect(() => {
  getGastos();
}, [])
const descargarPDF= async ( pdf)=>{
  let res=await axiosURL.get('/pdf/gastos/rendicion',{
    headers: {archivo:pdf},
    responseType: "blob"
  });
  const pdfBlob = await new Blob([res.data], { type: "application/pdf" });
  saveAs(pdfBlob, `${pdf}`);
}
    const  antGasto = dataGasto
    const filtroAprobacion= antGasto.filter(q=> q.estadoFinal==='aprobado' && (q.norden!==''|| q.norden===null));
 
    
    const columns = [
      {
        title: 'N de Ant Gasto',
        dataIndex: 'id',
        key: 'id',
        width:'80px',
      },
      {
        title: 'Nombre',
        dataIndex: 'nombre',
        key: 'nombre',
      },
      {
        title: 'Apellido',
        dataIndex: 'apellido',
        key: 'apellido',
      },
        
        {
          title: 'Fecha',
          dataIndex: 'fecha',
          key: 'fecha',
        },
      
        {
          title: 'Importe',
          key: 'importe',
          dataIndex: 'importe',
          render:(state,file)=>(<span > ${file.importe}</span>)
        },
        {
          title: 'Modalidad',
          key: 'sinAnticipo',
          dataIndex: 'sinAnticipo',
          render:(state,file)=>(
            <>
            {
              file.sinAnticipo==='sin'?<span >Sin Anticipo </span>:<span  >Con Anticipo</span>
            }
            </>
          )
        },

        {
          title: 'Estado',
          dataIndex: 'estadoFinal',
          key: 'estadoFinal',
        },
        {
          title: 'N orden',
          dataIndex: 'norden',
          key: 'norden',
        },
        {
          title: 'PDF',
          dataIndex: 'pdf',
          key: 'pdf',
          render:(state,file)=>(
            <Button type='link' onClick={()=>descargarPDF(file.pdf)} >{file.pdf}</Button>
          )
        },
        {
          title: 'Acciones',
          key: 'acciones',
          render: (state, file) => (
            <>
           {
              file.pagoRealizado==='Si'?
              <p>Realizado</p>
              :
              <Modalgasto
               boton='Completar' importe={file.importe} importeRendido={file.importerendido} 
              title='Rendicion con Anticipo'  id={file.id}
              orden={file.norden}
              file={file}
              stateFile={stateFile}
              setStateFile={setStateFile}
              get={getGastos}
              sinocon={file.sinAnticipo}
              />

            }
            </>
          ),
        },
      ];
      const datos = filtroAprobacion?.map((f) => {
        return {
          ...f,
          key: f.id,
          nombre: f.usuario.nombre,
          apellido: f.usuario.apellido,
        };
      });

      
    return (
        <Table columns={columns} dataSource={datos} pagination={false} bordered={true}/>
    )
}

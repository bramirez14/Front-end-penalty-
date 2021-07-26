import React,{useState,useEffect} from 'react'
import { Button, Table, } from 'antd';
import { axiosURL } from '../config/axiosURL';
import { Modalgasto } from './helpers/Modalgasto';
import { saveAs } from "file-saver";
import { conAnticipo906, sinAnticipo906 } from './helpers/funciones';

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
    const filtroAprobacion= antGasto.filter(q=> q.estadoFinal==='aprobado' && q.procesoFinalizado==='Si');
    const sinAnticipo=sinAnticipo906(dataGasto);
    const conAnticipo=conAnticipo906(dataGasto)
    const anticipoTotal=[...sinAnticipo,...conAnticipo]
    console.log(anticipoTotal);
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
          key: 'importerendido',
          dataIndex: 'importerendido',
          render:(state,file)=>(<span > ${file.importerendido}</span>)
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
          title: 'PDF Proveedores',
          dataIndex: 'pdf',
          key: 'pdf',
        render:(state,file)=>{return(
          <>  
          { file.pdf===null || ''?<span>No hay pdf</span>:
            <Button type='link' onClick={()=>descargarPDF(file.pdf)} >pdf</Button>
            }
          </>
          )}
        },
        {
          title: 'PDF Pagos',
          dataIndex: 'pdfinal',
          key: 'pdfinal',
          render:(state,file)=>{
         
            return(
              <>
              {file.pdf===null || ''?<span>No hay pdf</span>: 
              
            <Button type='link' onClick={()=>descargarPDF(file.pdfinal)} >pdf</Button>
              
              }
              </>
          )}
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
               boton='Completar' 
               importe={file.importe} importeRendido={file.importerendido} 
              title='Rendicion con Anticipo'  id={file.id}
              orden={file.norden}
              file={file}
              stateFile={stateFile}
              setStateFile={setStateFile}
              get={getGastos}
              sinocon={file.sinAnticipo}
              listo={file.listo}
              pagoRealizado={file.pagoRealizado}
              />

            }
            </>
          ),
        },
      ];
      const datos = anticipoTotal?.map((f) => {
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

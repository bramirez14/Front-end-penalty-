import React,{useState,useEffect} from 'react'
import { Table, Button,Form,Input} from 'antd';
import { PeticionGET } from '../config/PeticionGET';
import { axiosURL } from '../config/axiosURL';
import { saveAs } from "file-saver";
import { ModalKm } from '../components/rendicionesKm/ModalKm';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import { Archivo } from '../file/Archivo';

export const PagosAntSueldo = ({history}) => {
  const [dataSueldo, setDataSueldo] = useState([])
  const [stateFile, setStateFile] = useState({
file:''
  })

    const getSueldo= async ()=>{
      const {data} = await axiosURL.get('/anticipo')
      setDataSueldo(data)
    }
    useEffect(() => {
      getSueldo();
    }, [])

    const descargarPDF= async ( pdf)=>{
      let res=await axiosURL.get('/pdf/gastos/rendicion',{
        headers: {archivo:pdf},
        responseType: "blob"
      });
      const pdfBlob = await new Blob([res.data], { type: "application/pdf" });
      saveAs(pdfBlob, `${pdf}`);
    }
    console.log(dataSueldo);
    const filtroAprobacion= dataSueldo.filter(q=> q.estadoFinal==='aprobado' && q.procesoFinalizado==='Si' );
      console.log(filtroAprobacion);
  
      const finalizar= async (id)=>{
          console.log(id);
            if(stateFile.file===''){
              Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Ingrese un archivo pdf!',
                
              })
            }
            const obj={
              pagoRealizado:'Si'
            }
            const f= new FormData();
            f.append('file',stateFile.file);
            f.append('pagoRealizado',obj.pagoRealizado)
            await axiosURL.put(`/pago/sueldo/${id}`,f);
            setStateFile({file:''})
            
            getSueldo()
          }
          const handleFileChange = (e)=> {
              setStateFile({...stateFile,file:e.target.files[0]})
          }
    const columns = [
        {
          title: 'N de Anticipo',
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
          title: 'Devolucion',
          dataIndex: 'sueldo',
          key: 'sueldo',
        },
        {
          title: 'Cuotas',
          dataIndex: 'cuotas',
          key: 'cuotas',
        },
      
        {
          title: 'Importe',
          key: 'importe',
          dataIndex: 'importe',
          render:(state,file)=>(<p>${file.importe}</p>)
        },
        {
          title: 'Estado',
          dataIndex: 'estadoFinal',
          key: 'estadoFinal',
        },
        {
          title: 'PDF Proveedores',
          dataIndex: 'pdf',
          key: 'pdf',
        render:(state,file)=>{return(
          <>  
          { file.pdf===null || file.pdf===''?<span>No hay pdf</span>:
            <Button type='link' onClick={()=>descargarPDF(file.pdf)} >descargar</Button>
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
              {file.pdfinal===null || file.pdfinal===''?<span>No hay pdf</span>: 
              
            <Button type='link' onClick={()=>descargarPDF(file.pdfinal)} >descargar</Button>
              
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
            <ModalKm title={'Sueldo'} boton={'Completar'} Return={'Salir'} Submit={'Finalizar'} click={()=>finalizar(file.id)} >
              <Form layout="vertical">
  <Form.Item label='Numero de Orden'>
      <Input value={'#' + file.norden} disabled/>
  </Form.Item>
  
  <Form.Item label='Importe a Pagar'>
      <Input value={'$'+ file.importe} disabled/>
  </Form.Item>
  
  <Form.Item  >
      <Archivo change={handleFileChange}/>
  </Form.Item>
  <Form.Item label={stateFile.file.name}/>
        </Form>
            </ModalKm>
              
  
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
        <Table dataSource={datos} columns={columns} />
    )
}

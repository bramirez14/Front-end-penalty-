import React,{useState,useEffect} from 'react'
import { Table, Button,Form,Input} from 'antd';
import { axiosURL } from '../config/axiosURL';
import { saveAs } from "file-saver";
import { ModalKm } from '../components/rendicionesKm/ModalKm';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import { Archivo } from '../file/Archivo';
import { BiDownload } from 'react-icons/bi';

export const PagosKm = () => {
  const [stateFile, setStateFile] = useState('');
  const [stateFilefinal, setStateFilefinal] = useState('');
  const [dataKm, setDataKm] = useState([])
 
  const getKm = async ()=>{
    const {data} = await axiosURL.get('/todos/kilometros')
    setDataKm(data)
  }
  useEffect(() => {
    getKm();
  }, [])
  const descargarPDF= async ( pdf)=>{
    let res=await axiosURL.get('/pdf/gastos/rendicion',{
      headers: {archivo:pdf},
      responseType: "blob"
    });
    const pdfBlob = await new Blob([res.data], { type: "application/pdf" });
    saveAs(pdfBlob, `${pdf}`);
  }
  console.log(dataKm);
  const filtroAprobacion= dataKm.filter(q=> q.estadoFinal==='aprobado' && q.procesoFinalizado==='Si' );
    console.log(filtroAprobacion);

    const finalizar= async (id)=>{
      if (stateFile === '') {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Ingreses los  archivo pdf!",
        });
      }else if (stateFilefinal===''){
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Ingreses los  archivo pdf!",
        });
    
    
      }else{
        
        const obj={
          procesoPagar:'Si'
        }
        const f= new FormData();
        f.append('file',stateFile);
        f.append('procesoPagar',obj.procesoPagar)
        await axiosURL.put(`/pago/km/${id}`,f);
        await finalizarfinal(id,stateFilefinal)
        setStateFile('')
        setStateFilefinal('')
        getKm()
         
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'se guardo con exito!!!',
          showConfirmButton: false,
          timer: 1500
        })

      }
          
        }
        const finalizarfinal=async (id,statefinal) =>{
          const final = new FormData();
          final.append("file",statefinal);
          const  result= await axiosURL.put(`/pagofinal/kilometros/${id}`, final);
          console.log(result);
        }
        const handleFileChange = (e)=> {
            setStateFile(e.target.files[0])
        }
        const handleFileChangeFinal = (e)=> {
          setStateFilefinal(e.target.files[0])
      }
  const columns = [
    {
      title: 'N de Ant km',
      dataIndex: 'id',
      key: 'id',
      width:'80px',
      render:(state,file)=><span>#{file.id}</span>
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
        title: 'Km Total',
        key: 'kmTotal',
        dataIndex: 'kmTotal',
        width: '100px',
        render:(state,file)=>(<span style={{marginLeft: "20px"}}> {file.kmTotal} Km</span>)
      },
    
      {
        title: 'Importe Total',
        key: 'importeTotal',
        dataIndex: 'importeTotal',
        render:(state,file)=>(<span style={{marginLeft: "20px"}}> ${file.importeTotal}</span>)
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
        { file.pdf===null || file.pdf===''?<span>No hay pdf</span>:
          <Button type='link' onClick={()=>descargarPDF(file.pdf)} style={{marginLeft:30}}><BiDownload /></Button>
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
            
          <Button type='link' onClick={()=>descargarPDF(file.pdfinal)} ><BiDownload /></Button>
            
            }
            </>
        )}
      },
      {
        title: "  PDF Orden pago final ",
        dataIndex: "pdfpagoFinal",
        key: "pdfpagoFinal",
        width:170,
        render: (state, file) => {
          return (
            <>
              {file.pdfpagoFinal === null || file.pdfpagoFinal === "" ? (
                <span>No hay pdf</span>
              ) : (
                <Button type="link" onClick={() => descargarPDF(file.pdfpagoFinal)} >
                  <BiDownload />
                </Button>
              )}
            </>
          );
        },
      },
      {
        title: 'Acciones',
        key: 'acciones',
        render: (state, file) => (
          <>
         {
            file.procesoPagar==='Si'?
            <p>Realizado</p>
            :
          <ModalKm title={'Kilometros'} boton={'Completar'} Return={'Salir'} Submit={'Finalizar'} click={()=>finalizar(file.id)} >
            <Form layout="vertical">
<Form.Item label='Numero de Orden'>
    <Input value={'#' + file.norden} disabled/>
</Form.Item>

<Form.Item label='Importe a Pagar'>
    <Input value={'$'+ file.importeTotal} disabled/>
</Form.Item>

<Form.Item  >
    <Archivo boton='PDF pago' change={handleFileChange}/>
</Form.Item>
<p>{stateFile.name}</p>
<Form.Item  >
      <Archivo boton='PDF Orden de pago final' change={handleFileChangeFinal}/>
  </Form.Item>
  <p>{stateFilefinal.name}</p>
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

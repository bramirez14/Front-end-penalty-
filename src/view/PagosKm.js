import React,{useState,useEffect} from 'react'
import { Button,Form,Input,Row, Col, Switch} from 'antd';
import { axiosURL } from '../config/axiosURL';
import { saveAs } from "file-saver";
import { ModalKm } from '../components/rendicionesKm/ModalKm';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import { Archivo } from '../file/Archivo';
import { BiDownload } from 'react-icons/bi';
import { HelperTABLEobj } from '../helpers/HelperTABLEobj';



export const PagosKm = () => {
  const [state, setState] = useState(false)
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
      render:(state,file)=><h5>#{file.id}</h5>
    },
    {
      title: 'Nombre',
      dataIndex: 'nombre',
      key: 'nombre',
      render:(state,file)=><h5>{file.nombre}</h5>
      
    },
    {
      title: 'Apellido',
      dataIndex: 'apellido',
      key: 'apellido',
      render:(state,file)=><h5>{file.apellido}</h5>

    },
    {
        title: 'Km Total',
        key: 'kmTotal',
        dataIndex: 'kmTotal',
        width: 100,
        render:(state,file)=>(<h5 style={{marginLeft: "20px"}}> {file.kmTotal} Km</h5>)
      },
    
      {
        title: 'Importe Total',
        key: 'importeTotal',
        dataIndex: 'importeTotal',
        render:(state,file)=>(<h5 style={{marginLeft: "20px"}}> ${file.importeTotal}</h5>)
      },
      
      {
        title: 'N orden',
        dataIndex: 'norden',
        key: 'norden',
      render:(state,file)=><h5>{file.norden}</h5>

      },
      {
        title: 'PDF Proveedores',
        dataIndex: 'pdf',
        key: 'pdf',
      render:(state,file)=>{return(
        <>  
        { file.pdf===null || file.pdf===''?<h5>No hay pdf</h5>:
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
            {file.pdfinal===null || file.pdfinal===''?<h5>No hay pdf</h5>: 
            
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
                <h5>No hay pdf</h5>
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
            <h5>Realizado</h5>
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
      const filtroPagoRealizado = datos.filter(d=>d.procesoPagar === 'Si');
      const filtroPagoIncompleto = datos.filter(d=>d.procesoPagar   !== 'Si');
    return  (  
       <>
        <Row style={{marginTop:20,marginBottom:20}}><Col span={24}>
      <Switch checkedChildren="Pendientes" unCheckedChildren="Finalizados" defaultChecked onChange={()=>setState(!state)} style={{marginRight:10}} />
    </Col>
    </Row>
        <HelperTABLEobj  
        data={state?filtroPagoRealizado:filtroPagoIncompleto}
        columns={columns} />
        </>
    )
}

import React,{useState,useEffect} from 'react'
import { Table, Button,Form,Input, Row, Col, Switch, Descriptions} from 'antd';
import { axiosURL } from '../config/axiosURL';
import { saveAs } from "file-saver";
import { ModalKm } from '../components/rendicionesKm/ModalKm';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import { Archivo } from '../file/Archivo';
import { BiDownload } from 'react-icons/bi';
import { numberWithCommas } from '../components/reportes/helpers/funciones';
import { HelperTABLEobj } from '../helpers/HelperTABLEobj';


export const PagosAntSueldo = ({history}) => {
  const [state, setState] = useState(false)
  const [dataSueldo, setDataSueldo] = useState([]);
  const [stateFile, setStateFile] = useState('');
  const [stateFilefinal, setStateFilefinal] = useState('');


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
    const filtroAprobacion= dataSueldo.filter(q=> q.estadoFinal==='aprobado'  );
        
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
              pagoRealizado:'Si'
            }
            const f= new FormData();
            f.append('file',stateFile);
            f.append('pagoRealizado',obj.pagoRealizado)
            await axiosURL.put(`/pago/sueldo/${id}`,f);
            await finalizarfinal(id,stateFilefinal)
            setStateFile('')
            setStateFilefinal('')
            getSueldo()

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
            const  result= await axiosURL.put(`/pagofinal/sueldo/${id}`, final);
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
          title: 'N de Anticipo',
          dataIndex: 'id',
          key: 'id',
          width:80,
          render: (state, file) => <h5>{file.id}</h5>
        },
        {
          title: 'Nombre',
          dataIndex: 'nombre',
          key: 'nombre',
          render: (state, file) => <h5>{file.nombre}</h5>

        },
        {
          title: 'Apellido',
          dataIndex: 'apellido',
          key: 'apellido',
          render: (state, file) => <h5>{file.apellido}</h5>

        },
       
        {
          title: 'Estado',
          dataIndex: 'estadoFinal',
          key: 'estadoFinal',
          render: (state, file) => <h5>{file.estadoFinal}</h5>

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
      <Archivo boton='PDF Pago' change={handleFileChange}/>
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
          description: (  <Descriptions title={`Info ${f.id}`} style={{border:' solid 2px #ddd', padding:20}}>
      <Descriptions.Item label="Fecha"><b>{f.fecha}</b></Descriptions.Item>
      <Descriptions.Item label="Devolucion"><b>{f.sueldo}</b></Descriptions.Item>
      <Descriptions.Item label="Cuotas"><b>{f.cuotas}</b></Descriptions.Item>
      <Descriptions.Item label="Importe"><b>{f.importe}</b></Descriptions.Item>


      
      </Descriptions>)
        };
      });
      const filtroPagoRealizado = datos.filter(d=>d.pagoRealizado==='Si')
      const filtroPagoIncompleto = datos.filter(d=>d.pagoRealizado !=='Si')
    return (
      <>
       <Row style={{marginTop:20,marginBottom:20}}><Col span={24}>
      <Switch
      checkedChildren="Pendientes" unCheckedChildren="Finalizados" defaultChecked onChange={()=>setState(!state)} style={{marginRight:10}} />
    </Col>
    </Row>
        <HelperTABLEobj
         data={state?filtroPagoRealizado.reverse():filtroPagoIncompleto.reverse()}
          columns={columns} 
          expandible={true} />
      </>
    )
}

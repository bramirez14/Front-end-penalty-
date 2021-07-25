import React, { useState,useEffect } from "react";
import { axiosURL } from "../config/axiosURL";
import { Card, Collapse, Button, Row, Col,Table} from "antd";
import { Modale } from "./helpers/Modale";
import { saveAs } from "file-saver";

const N=localStorage.getItem('N');


export const RendicionGastosVista = ({history}) => {
  
  const [gasto, setGasto] = useState([]);


/**evitar que usuari 905 ingresen a la ruta */
  N!=='905'&& history.push('/perfil')

/* const finalizar= async (id)=>{
let result = await axiosURL.post(`/finalizar/gasto/${id}`,{procesoFinalizado:'Si'})
result.status===200 && history.push('/perfil')
} */
 
  const get= async()=>{
const { data}=await axiosURL.get('/gastos')  
setGasto(data)
}
useEffect(() => {
  get()
}, [])
  const filtroListo = gasto.filter((f) => f.listo === "Si");
  const descargarPDF= async ( pdf)=>{
    let res=await axiosURL.get('/pdf/gastos/rendicion',{
      headers: {archivo:pdf},
      responseType: "blob"
    });
    const pdfBlob = await new Blob([res.data], { type: "application/pdf" });
    saveAs(pdfBlob, `${pdf}`);
  }
console.log(filtroListo);
  const columns = [
    { title: 'Numero de Anticipo', dataIndex: 'id', key: 'id',width:'100px',render:(state,file)=> <span>#{file.id}</span> },

    { title: 'Nombre', dataIndex: 'nombre', key: 'nombre',width:'100px' },
    { title: 'Apellido', dataIndex: 'apellido', key: 'apellido',width:'100px' },
    { title: 'Fecha', dataIndex: 'fecha', key: 'fecha',width:'100px' },

    { title: 'Importe', dataIndex: 'importe', key: 'importe',width:'100px'},
    { title: 'Nota', dataIndex: 'notas', key: 'notas',width:'100px' },
   
    { title: 'N° orden', dataIndex: 'norden', key: 'norden',width:'100px' },
    { title: 'PDFSB', dataIndex: 'pdf', key: 'pdf',width:'100px',render:(state,file)=> <Button type='link' onClick={()=>descargarPDF(file.pdf)}> pdf </Button> },//cambiar nombre de titulo
    { title: 'Acciones', dataIndex: 'acciones', key: 'acciones',width:'100px', render:(state,file)=>(
      <>
    {file.procesoFinalizado==='Si'?<span y>Completado</span>:<Modale id={file.id} orden={file.norden} get={get} />}
    </>
    )
  },
  ];

  




  const datos = gasto?.map((f) => {
    return {
      ...f,
      key: f.id,
      nombre: f.usuario.nombre,
      apellido: f.usuario.apellido,
      description: (
        <Row gutter={[10, 10]}>
          {f.rendicion.map((r) => (
            <>
              <Col xs={6} sm={4} md={4} lg={4} xl={4}>
                <Card
                  style={{
                    width: 200,
                    border: "solid 2px #ddd",
                    height: "auto",
                  }}
                >
                  <img
                    style={{ width: 100, height: 100 }}
                    alt="example"
                    src={r.imagen}
                  />
                  <p>
                    <b>Fecha:</b> {r.fecha}
                  </p>
                  <p>
                    <b>Categoria:</b> {r.categoria}
                  </p>
                  <p>
                    <b>Importe:</b> ${r.importe}
                  </p>
                  <p>
                    <b>Nota:</b> {r.notas}
                  </p>
                </Card>
              </Col>
            </>
          ))}
        </Row>
      ),
    };
  });





  return (
    <>
    
      <Table
    columns={columns}
    expandable={{
      expandedRowRender: record => <p style={{ margin: 0 }}>{record.description}</p>,
    }}
    dataSource={datos}
    bordered
  />
    </>
  
)}
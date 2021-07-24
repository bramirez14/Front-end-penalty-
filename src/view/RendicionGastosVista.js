import React, { useState,useEffect } from "react";
import { axiosURL } from "../config/axiosURL";
import { Card, Collapse, Button, Avatar, Row, Col,Modal} from "antd";
import { Modale } from "./helpers/Modale";

const N=localStorage.getItem('N');
const { Panel } = Collapse;
const { Meta } = Card;

export const RendicionGastosVista = ({history}) => {
  
  const [gasto, setGasto] = useState([]);
  const [state, setState] = useState({
    key: "Gasto",
    noTitleKey: "app",
  });

/**evitar que usuari 905 ingresen a la ruta */
  N!=='905'&& history.push('/perfil')

/* const finalizar= async (id)=>{
let result = await axiosURL.post(`/finalizar/gasto/${id}`,{procesoFinalizado:'Si'})
result.status===200 && history.push('/perfil')
} */
  const onTabChange = (key, type) => {
    console.log(key, type);
    setState({ [type]: key });
  };
  const get= async()=>{
const { data}=await axiosURL.get('/gastos')  
setGasto(data)
}
useEffect(() => {
  get()
}, [])
  const filtroListo = gasto.filter((f) => f.listo === "Si");

console.log(filtroListo);

  const style = {
    marginLeft: "10px",
  };

  const contentList = {
    Gasto: (
      <Collapse>
        {filtroListo.map((m) => (
          <>
            <Panel
              header={
                <>
                  <span style={style}>
                    {<Avatar src={m.usuario.imagen} />}
                  </span>
                  <span style={style}># {m.id},</span>
                  <span style={style}>
                    <b>Nombre: </b>
                    {m.usuario.nombre}
                  </span>
                  <span>{m.usuario.apellido},</span>
                  <span style={style}>
                    <b>Fecha de solicitud:</b> {m.fecha},
                  </span>
                  <span style={style}>
                    <b>Importe:</b> ${m.importe}
                  </span>
                 
                </>
              }
              key={m.id}
            >
              <Row gutter={20}>
                {m.rendicion.map((mm) => (
                  <>
                    <Col xs={6} sm={6} md={6} lg={6} xl={6}>
                      <Card
                        style={{
                          width: 200,
                          height: 320,
                          border: "solid 2px #ddd",
                        }}
                        cover={
                          <img
                            alt="example"
                            src={mm.imagen}
                            alt="No hay imagen"
                            style={{
                              borderRadius: "10px",
                              width: 200,
                              height: 150,
                            }}
                          />
                        }
                      >
                        <Meta
                          title={mm.categoria}
                          description={
                            <>
                              <p>fecha: {mm.fecha}</p>
                              <p>importe: ${mm.importe}</p>
                            </>
                          }
                        />
                      </Card>
                    </Col>
                  </>
                ))}
                  
                 <Col xs={24} sm={24} md={24} lg={24} xl={24} >
                   {m.procesoFinalizado==='Si'?<span style={{float:'right'}}>Completado</span>:<Modale id={m.id} orden={m.norden} />}
                 
                </Col>

         
              </Row>

           
          
            </Panel>
          </>
        ))}
      </Collapse>
    ),
    Vacaciones: <p>En Contruccion!!!</p>,
  };

  return (
    <>
      <Card
        style={{ width: "100%" }}
        title="Verificaciones"
        activeTabKey={state.key}
        onTabChange={(key) => {
          onTabChange(key, "key");
        }}
      >
        {contentList[state.key]}
      </Card>
    </>
  
)}
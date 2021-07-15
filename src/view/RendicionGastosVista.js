import React from "react";
import { Row, Col, Card, Avatar} from "antd";

import { PeticionGET } from "../config/PeticionGET";
import { Button } from "antd/lib/radio";
import { axiosURL } from "../config/axiosURL";
export const RendicionGastosVista = ({history}) => {
const N=localStorage.getItem('N');
/**evitar que usuari 905 ingresen a la ruta */
  N!=='905'&& history.push('/perfil')
  const getRendiconesLista = PeticionGET("/gastos");
  const filtro = getRendiconesLista.filter((g) => g.listo === "Si" && g.procesoFinalizaado!=='SI');
const finalizar= async (id)=>{
let result = await axiosURL.post(`/finalizar/gasto/${id}`,{procesoFinalizado:'Si'})
result.status===200 && history.push('/perfil')
}
  const { Meta } = Card; 
  return (
    <div style={{ padding: 20 }}>
      {filtro.map((f) => (
        <Row
          gutter={[0,10]}
          style={{
            border: "solid 2px #ddd",
            padding: "10px",
            borderRadius: "20px",
            marginTop: 40,
          }}
        >
          <Col
            xs={24}
            sm={24}
            md={24}
            lg={24}
            xl={24}
            style={{ borderBottom: "solid 1px #ddd" }}
          >
            <h4 style={{ textAlign: "center" }}>
<span style={{ marginLeft: 30 }}>#{f.id }</span>
<span style={{ marginLeft: 30 }}> <b>Nombre Completado: </b>{f.usuario.nombre} {f.usuario?.apellido}</span> 
            <span style={{ marginLeft: 30 }}> <b>Fecha: </b> {f.fecha}</span>  
              <span style={{ marginLeft: 30 }}>
                <b>Importe solicitado: </b> ${f.importe}
              </span>
              <span style={{ marginLeft: 30 }}>
                <b>Importe rendido: </b>  ${f.importerendido}
              </span>
            </h4>
          </Col>
           { f.rendicion.map(ff=>
           <>
          <Col xs={2} sm={4} md={8} lg={8} xl={8}>
            <Card
              style={{ width: 250 }}
              cover={<img style={{ width:250, height: 150, borderRadius:10}} alt="No hay foto!!!" src={ff.imagen} />}
            >
              <Meta
                avatar={
                  <Avatar src={f.usuario.imagen}/>
                }
                title={ff.categoria}
                description={
                  <>
                    <p>fecha: {ff.fecha}</p>
                    <p>Importe: ${ff.importe}</p>
                    <p>mensaje: {ff.notas}</p>
                  </>
                }
              />
            </Card>
           
          </Col>
          
        </>
          )}
          <Col xs={24}
          sm={24}
          md={24}
          lg={24}
          xl={24} offset={21} >
        <Button onClick={()=>finalizar(f.id)}  > Completado </Button>
        </Col> 
        </Row>
      ))}
     
    </div>
  );
};

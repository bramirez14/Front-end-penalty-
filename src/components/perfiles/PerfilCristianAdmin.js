import React, { useState,useContext, useEffect,useRef } from "react";
import { Drawer, List, Avatar, Divider, Col,Row,Card} from "antd";
import "./css/perfiles.css";

/* import bcryptjs from "bcryptjs";*/

import axiosURL from "../../config/axiosURL";
import PeticionGET from "../../config/PeticionGET";






export const PerfilCristianAdmin = ({ history }) => {
 

  const [visible, setVisible] = useState(false)
  const [DatosPersonales, setDatosPersonales] = useState({})
 
  const {email,imagen,tipousuario,categoria,nvendedor,fechaContratacion,departamento,cel}=DatosPersonales
  const TodosLosUsuarios =PeticionGET('/allusers');
  console.log(TodosLosUsuarios);
  const DescriptionItem = ({ title, content }) => (
    <div className="site-description-item-profile-wrapper">
      <p className="site-description-item-profile-p-label">{title}:</p>
      {content}
    </div>
  );
  const showDrawer = (id) =>{
    console.log(id);
    let e= TodosLosUsuarios.find(q=> q.id===id);
    setDatosPersonales(e)
    setVisible(true)}
 // console.log(DatosPersonales);
  const onClose = () => setVisible(false)
 /**Selecion de Colores para conectado*/
 const SelecionColores = (conectado)=>{
   console.log(conectado);
  if(conectado==="SI"){return(<span style={{color:'green'}}> <b>Si</b> </span>)} else{
    return(<span style={{color:'red'}}> <b>No</b> </span>)
  }
 }
  
  let tokenStorage = (localStorage.getItem("token"));
  

  //Peticion get para saber cuando vence el localStorage
  const [tokenEstado, setTokenEstado] = useState({});

  const { nombre, apellido } = tokenEstado;
  useEffect(() => {
    const cargarUsuario = async () => {
      let datosJWT = await axiosURL.get("/check", {
        headers: { token: tokenStorage },
      });
      setTokenEstado(datosJWT.data);
    };
    cargarUsuario();
  }, []);

 

  return ( 
    <>
     <div className='contenedore'>
    <Row gutter={10}>
          <Col xs={24} sm={24} md={12} lg={6} xl={6}>
      <Card title="Default size card" extra={<a href="#">More</a>} >
    <p>Card content</p>
    <p>Card content</p>
  </Card>
  </Col>

  <Col xs={24} sm={24} md={12} lg={6} xl={6}>
  <Card title="Default size card" extra={<a href="#">More</a>} >
    <p>Card content</p>
    <p>Card content</p>
  </Card>
  </Col>
  <Col xs={24} sm={24} md={12} lg={6} xl={6}>
  <Card title="Default size card" extra={<a href="#">More</a>} >
    <p>Card content</p>
    <p>Card content</p>
  </Card>
  </Col>
  <Col xs={24} sm={24} md={12} lg={6} xl={6}>

  <Card title="Default size card" extra={<a href="#">More</a>} >
    <p>Card content</p>
    <p>Card content</p>
  </Card>
  </Col>
  </Row>
  
  {/**Lista */}
  <Row style={{marginTop:20}}>
  <Col span={12}>
    <div></div>
  </Col>
  <Col span={12}> 
  
    <List bordered  className='lista'  >
    {TodosLosUsuarios.map( (q,i) => (
      
     <>
      
          
            <List.Item
              key={q.id}
              actions={[
                <a onClick={(id)=>showDrawer(q.id)} key={q.id}>
                  View Profile
                </a>,
              ]}
            >
              <List.Item.Meta
              key={q.id}
                avatar={
                  <Avatar src={q.imagen} />
                }
                title={<a href="https://ant.design/index-cn">{q.nombre} {q.apellido}</a>}
                description={q.email}

              />
              <span  className='conectado' >Conectado: { SelecionColores(q.conectado) }</span>
            </List.Item >
                  
            
            </>
            )
 )}
 </List>
            </Col>

</Row>
</div>

    <Drawer
          width={640}
          placement="right"
          closable={false}
          onClose={onClose}
          visible={visible}
        >
          <p className="site-description-item-profile-p" style={{ marginTop: 40 }}>
            Datos del Usuario
          </p>
          <Row>
            <Col span={24}>
            <img src={imagen} alt="" style={{width:200,height:200, marginBottom:20}}/>
            </Col>
            
            <Col span={12}>
              <p> <b>Nombre</b>: {DatosPersonales.nombre}</p>
            </Col>
           
            <Col span={12}>
              <p> <b>Apellido</b>:  {DatosPersonales.apellido} </p>
            </Col>
          
            <Col span={12}>
            <p><b>Tipo de usuario</b>: {tipousuario}</p>
            </Col>

            <Col span={12}>
            <p><b>Email</b>: {email}</p>
            </Col>
          
            <Col span={12}>
            <p><b>Fecha de Contratacion</b>: {fechaContratacion}</p>
            </Col>
            <Col span={12}>
            <p><b>Categoria </b>: {categoria}</p>
            </Col>
            <Col span={12}>
            <p><b>N de vendedor   </b>: {nvendedor}</p>
            </Col>
            <Col span={12}>
            <p><b>Departamento </b>: {departamento?.departamento}</p>
            </Col>
            <Col span={12}>
            <p><b>Cel</b>: {cel}</p>
            </Col>
          </Row>
        
     
        </Drawer>
       
 
         
          

    </>
  );
};

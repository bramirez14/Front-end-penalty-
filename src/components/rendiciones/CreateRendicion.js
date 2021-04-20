import React, { useState, useEffect } from "react";
import { InputMsg } from "../formularios/InputMsg";
import axios from "axios";
import { Form, Input, Button, Select, Col, Row, Checkbox,Modal} from "antd";
import "./css/createRendicion.css";
import { DragDrop } from "../formularios/DragDrop";
import { TiUser } from "react-icons/ti";
import { SelectAnt } from "../inputs/SelectAnt";
import axiosURL from "../../config/axiosURL";
import { Tabla } from "./Tabla";
import { CheckBoxSelector } from "./CheckBoxSelector";
export const CreateRendicion = ({ history }) => {
  const [autocompletado, setAutocompletado] = useState({
    email:'',
    departamento:''
  });
  const {email,departamento}=autocompletado

 

/*****Lo nuevo */
const [rendicion, setRendicion] = useState({
  usuarioId:'',
  responsable: "",
  fecha:new Date().toLocaleDateString(),
  responsable:''
});
const {fecha,usuarioId}=rendicion
const [usuario, setUsuario] = useState([])
let token= JSON.parse(localStorage.getItem('token'))
let name= JSON.parse(localStorage.getItem('name'))
let id= JSON.parse(localStorage.getItem('id'))

useEffect(() => {
 const getPK= async ()=>{
   let res= await  axiosURL.get(`/${id}`)
   setUsuario(res.data)
 }
 getPK();
}, [])

const responsable=(departamento)=>{
  let responsable;
  switch (departamento) {
    case "Sistema" || "Logistica":
      responsable = "Esteban Ramos";
      break;
    case "Administracion" || "Marketing":
      responsable = "Cristian De Sousa";
      break;
    default:
      responsable = "Cristian Rios";
      break;
  } 
  return responsable
}
   


console.log(usuario.gasto);
  return (
    
    <Form  layout="vertical" >
      <Row >
        <Col
          xs={24}
          sm={24}
          md={12}
          lg={12}
          xl={12}
          xxl={12}
          style={{borderBottom:'solid 1px rgba(92, 99, 105, 0.5)',borderTop:'solid 1px rgba(92, 99, 105, 0.5)'}}
        >
          <div style={{marginTop:'10px'}} >
          <h2>Rendicion de Gastos</h2>
          <Col xs={24} 
          sm={24}
          md={12}
          lg={18}
          xl={18}
          xxl={18}>
      <h2>Empleado: {name}</h2>
          </Col> 
        </div>
         
          
        </Col>
        <Col
          xs={24}
          sm={24}
          md={12}
          lg={12}
          xl={12}
          xxl={12}
          style={{borderBottom:'solid 1px rgba(92, 99, 105, 0.5)',borderTop:'solid 1px rgba(92, 99, 105, 0.5)'}}

        >
       
         <div style={{marginTop:'10px'}} >
          <h6> <b>Fecha:</b>  {fecha} </h6>
         
          <h6  >
            <b>Email:</b> {usuario.email}
          </h6>
          <h6>
            <b>Departamento:</b> {usuario.departamento?.departamento} 
            
          </h6>
          <h6>
          <b>Responsable:</b> {responsable(usuario.departamento?.departamento)}
          </h6>
          
            
         </div>
  
   
        </Col>
        
      </Row>

      <Row >
      
          <Col xs={24} sm={24} md={24} lg={24} xl={24}>

            <Tabla 
           usuario={usuario.gasto}
           setUsuario={setUsuario}
            />
 
</Col>
          </Row>
          <Col   xs={24}
          sm={24}
          md={12}
          lg={12}
          xl={12}
          xxl={12} offset={18}>
          <Form.Item >
    <Button  >
      Submit
    </Button>
  </Form.Item></Col>
      </Form>
     

  );
};

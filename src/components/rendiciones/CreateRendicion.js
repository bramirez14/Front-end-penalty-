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
//const [datosTabla, setDatosTabla] = useState([])
  const [data, setData] = useState([]);
  const [highlight, setHighlight] = useState(false);
  const [open, setOpen] = useState(false);
  const [users, setUsers] = useState([]);
const [gastos, setGastos] = useState([])
  const [rendicion, setRendicion] = useState({
    usuarioId:'',
    responsable: "",
    fecha:new Date().toLocaleDateString(),
    items:[{
      categoriaId: "",
      notas:'',
      imagen:'',
      descripcion: "",
      importe: "",
    }]
  });
  const {
    usuarioId,
   
    categoriaId,
    notas,
    imagen,
    responsable,
    descripcion,
    importe,
    fecha
  } = rendicion;
  const { Option } = Select;

  //use por cada table en la DB un  handle
  const handleSubmit = (e) => {
    e.preventDefault();
    guardarRendicion();
  };

  const handleImage = (e) => {
    console.log(e.target.files);
    setRendicion({
      ...rendicion,
      imagen: e.target.files,
    });
  };
  const guardarRendicion = async (e) => {
    let nuevoForm = new FormData();
    for (const img of imagen) {
      nuevoForm.append("image", img);
    }
    nuevoForm.append("responsable", responsable);
    nuevoForm.append("importe", importe);
    nuevoForm.append("userId", rendicion.userId);
    let respuesta = await axios.post(
      "http://localhost:4000/api/users/gastos",
      nuevoForm
    );
    console.log(respuesta);
    respuesta.status === 200 && history.push("/profile");
  };
 
  const getUser = async () => {
    let result = await   axiosURL.get("/allusers");
    setUsers(result.data);
  };

  useEffect(() => {
    getUser();
  }, []);



  const handleChangeEmpleado = (value) => {
    let buscarUsuario = users.find((u) => u.id == value);
//    console.log(buscarUsuario);
    let email = buscarUsuario.email;
    let departamento = buscarUsuario.departamento.departamento;
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


    setRendicion({
      ...rendicion,
      usuarioId: value,
      responsable,
    });
    setAutocompletado({
      ...autocompletado,
      email,
      departamento,
    })
  };
  const handleChange  = e =>{
    const{ name,value}=e.target;
    setRendicion({
      ...rendicion,
      [name]:value
    })
  }
const obteniendoLosAGastosUsuario=()=> {
let g= users.find((u) => u.id == usuarioId)
return g?.gasto

}
//console.log(obteniendoLosAGastosUsuario());

  const onFinish=(values)=>{
    console.log(values);
  }
 
//  console.log(rendicion);
 /***Sector Modal */


  console.log(open,'166');
  return (
    
    <Form  layout="vertical" onChange={handleChange} onFinish={onFinish} >
      <Row >
        <Col
          xs={24}
          sm={24}
          md={10}
          lg={10}
          xl={10}
          xxl={10}
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
          <SelectAnt
              name='usuarioId'
              mensaje='Debe seleccionar un empleado'
              placeholder='Empleado'
              array={users}
              change={handleChangeEmpleado}
              label='Empleado'
          />
          {/*        <Form.Item name='descripcion'
          label='Motivo del gasto' >
    <Input.TextArea
     autoSize={{ minRows: 2, maxRows: 6 }}
      placeholder='Ingrese el motivo del gasto'
      
    />
  </Form.Item> */}
          </Col> 
        </div>
         
          
        </Col>
        <Col
          xs={24}
          sm={24}
          md={8}
          lg={8}
          xl={8}
          xxl={8}
          style={{borderBottom:'solid 1px rgba(92, 99, 105, 0.5)',borderTop:'solid 1px rgba(92, 99, 105, 0.5)'}}

        >
       
         <div style={{marginTop:'10px'}} >
          <h6> <b>Fecha:</b>  {fecha} </h6>
         
          <h6  >
            <b>Email:</b> {email}
          </h6>
          <h6>
            <b>Departamento:</b> {departamento} 
            
          </h6>
          <h6>
          <b>Responsable:</b> {responsable}
          </h6>
          
            
         </div>
  
   
        </Col>
        <Col
          xs={24}
          sm={24}
          md={6}
          lg={6}
          xl={6}
          xxl={6}
          style={{borderBottom:'solid 1px rgba(92, 99, 105, 0.5)',borderTop:'solid 1px rgba(92, 99, 105, 0.5)'}}
        >
         <CheckBoxSelector
         funcion={obteniendoLosAGastosUsuario()}
         />
        </Col>
      </Row>

      <Row >
      
          <Col xs={24} sm={24} md={24} lg={24} xl={24}>

            <Tabla 
            categoria={categoriaId}
            descripcion={descripcion}
            notas={notas}
            importe={importe}
            array={users}
            funcion={obteniendoLosAGastosUsuario()}
            
            
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
    <Button  htmlType="submit" >
      Submit
    </Button>
  </Form.Item></Col>
      </Form>
     

  );
};

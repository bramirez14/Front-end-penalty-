import React, { useState, useEffect } from "react";
import { InputMsg } from "../formularios/InputMsg";
import axios from "axios";
import { Form, Input, Button, Select, Col, Row } from "antd";
import "./css/createRendicion.css";
import { DragDrop } from "../formularios/DragDrop";
import { TiUser } from "react-icons/ti";
import { SelectAnt } from "../inputs/SelectAnt";
import axiosURL from "../../config/axiosURL";
export const CreateRendicion = ({ history }) => {
  const [data, setData] = useState([]);
  const [highlight, setHighlight] = useState(false);
  const [open, setOpen] = useState(false);
  const [users, setUsers] = useState([]);
const [gasto, setGasto] = useState([])
  const [rendicion, setRendicion] = useState({
    departamento: "",
    responsable: "",
    item: "",
    categoria: "",
    descripcion: "",
    importe: "",
    imagen: [],
    deleteId: [],
    userId: "1",
    empleado: "Empleado",
    email: "",
    fecha:new Date().toLocaleDateString(),
   
  });
  const {
    departamento,
    responsable,
    item,
    categoria,
    descripcion,
    importe,
    imagen,
    deleteId,
    empleado,
    email,
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
    nuevoForm.append("departamento", departamento);
    nuevoForm.append("responsable", responsable);
    nuevoForm.append("item", item);
    nuevoForm.append("categoria", categoria);
    nuevoForm.append("descripcion", descripcion);
    nuevoForm.append("importe", importe);
    nuevoForm.append("userId", rendicion.userId);
    let respuesta = await axios.post(
      "http://localhost:4000/api/users/gastos",
      nuevoForm
    );
    console.log(respuesta);
    respuesta.status === 200 && history.push("/profile");
  };
  const handleSelectClick = (e) => {
    let buscarEmpleado = users.find((user) => e.target.value == user.id);
    setRendicion({
      ...rendicion,
      empleado: buscarEmpleado.nombre,
      userId: e.target.value,
    });
    setOpen(false);
  };

  const getUser = async () => {
    let result = await   axiosURL.get("/allusers");
    setUsers(result.data);
  };
  const llamarGerentes = async () => {
    let resultado = await axios.get("http://localhost:4000/api/users/allusers");
  };
  useEffect(() => {
    getUser();
  }, []);



  const handleChangeEmpleado = (value) => {
    let buscarUsuario = users.find((u) => u.id == value);
    console.log(buscarUsuario);
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
      userId: value,
      email,
      departamento,
      responsable,
    });
    console.log(`selected ${value}`);
  };

  console.log(rendicion);

  return (
    <Form className='form' layout="vertical" style={{width:'400px',marginLeft:'0'}}>
      <Row>
        <Col
          xs={24}
          sm={24}
          md={24}
          lg={24}
          xl={24}
          xxl={24}
     
        >
          <h2>Rendicion de Gastos</h2>
          <h4> <b>Fecha:</b>  {fecha} </h4>
          
         
          <SelectAnt
          name='userId'
          mensaje='Debe seleccionar un empleado'
          placeholder='Empleado'
          array={users}
          change={handleChangeEmpleado}
          label='Empleado'
          />
         <div style={{marginBottom:'20px'}}>
          <span  >
            <b>Email:</b> {email}
          </span><br/>
          <span>
            <b>Departamento:</b> {departamento} <br/>
            <b>Responsable:</b> {responsable}
          </span >
          </div>
     
        
          <Form.Item name='descripcion'
          label='Motivo del gasto' >
    <Input.TextArea
     autoSize={{ minRows: 2, maxRows: 6 }}
      placeholder='Ingrese le motivo del gasto'
      
    />
  </Form.Item>
  </Col>
      </Row>
    </Form>
  );
};

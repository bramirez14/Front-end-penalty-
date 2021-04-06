import React, { useState, useEffect } from "react";
import { InputMsg } from "../formularios/InputMsg";
import axios from "axios";
import { Form, Input, Button, Select, Col, Row } from "antd";
import "./css/createRendicion.css";
import { DragDrop } from "../formularios/DragDrop";
import { TiUser } from "react-icons/ti";
export const CreateRendicion = ({ history }) => {
  const [data, setData] = useState([]);
  const [highlight, setHighlight] = useState(false);
  const [open, setOpen] = useState(false);
  const [users, setUsers] = useState([]);
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
  } = rendicion;
  console.log(rendicion);

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
    let result = await axios.get("http://localhost:4000/api/users/allusers");
    setUsers(result.data);
    console.log(result.data);
  };
  const llamarGerentes = async () => {
    let resultado = await axios.get("http://localhost:4000/api/users/allusers");
  };
  useEffect(() => {
    getUser();
  }, []);

  const { Option } = Select;

  const handleChange = (value) => {
    let buscarUsuario = users.find((u) => u.id == value);
    let email = buscarUsuario.email;
    let departamento = buscarUsuario.departamento.departamento;
console.log(departamento)
    let responsable ;
    switch (departamento) {
      case ("Sistemas" || "Logistica"):
        responsable="Esteban Ramos"
        break;
        case ( "Administracion" || "Marketing"):
          responsable="Cristian De Sousa"
          break;
      default:
        responsable="Cristian Rios"
        break;
    }
     
    console.log(responsable);
    setRendicion({
      ...rendicion,
      userId: value,
      email,
      departamento,
    });
    console.log(`selected ${value}`);
  };

  function onBlur() {
    console.log("blur");
  }

  function onFocus() {
    console.log("focus");
  }

  function onSearch(val) {
    console.log("search:", val);
  }

  return (
    <Form style={{ padding: "20px" }}>
      <Row gutter={30}>
        <Col xs={24} sm={12} lg={12} style={{ border: "solid 1px" }}>
          <h2>Rendicion de Gastos</h2>
          <Form.Item
            rules={[
              {
                type: "name",
                message: "The input is not valid E-mail!",
              },
              {
                required: true,
                message: "Please input your E-mail!",
              },
            ]}
          >
            <Select
              name="empleado"
              showSearch
              style={{ width: 300 }}
              placeholder="Selecione un Empleado"
              optionFilterProp="children"
              onChange={handleChange}
              onFocus={onFocus}
              onBlur={onBlur}
              onSearch={onSearch}
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              {users.map((u) => (
                <Option key={u.id} value={u.id}>
                  {u.nombre}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <p>
            <b>Email:</b> {email}
          </p>
          <p>
            <b>Departamento:</b> {departamento}
            <h1>Pendiente...</h1>
          </p>
        </Col>
        <Col xs={24} sm={12} lg={12} style={{ border: "solid 1px" }}></Col>
      </Row>
    </Form>
  );
};


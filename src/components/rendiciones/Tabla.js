import React, { useState } from "react";
import { Table,  Button, Col, Modal, Form, Input, Upload, message } from "antd";
import axiosURL from "../../config/axiosURL";
import {Link} from 'react-router-dom'
export const Tabla = ({
  usuario,
  setUsuario
}) => {
  const [highlight, setHighlight] = useState(false);
  const [data, setData] = useState();
  const [visible, setVisible] = useState(false);
  const [visibleEditar, setVisibleEditar] = useState(false)
  const [loading, setLoading] = useState(false);
  const [rendicionEditar, setRendicionEditar] = useState({
    notas: '',
    importe: '',
    imagen: '',
    categoria: '',
    deleteId: [],
})
const { notas, importe, imagen, categoria, fecha, deleteId } = rendicionEditar
  const showModal = () => setVisible(true);
  const showModalEditar = () => setVisibleEditar(true);




  const handleOk = () => {
    setLoading(true);
    setTimeout(() => {
      setVisible(false);
      setLoading(false);
    }, 2000);
  };
  const handleOkEditar = () => {
    setLoading(true);
    editarRendicion()
    setTimeout(() => {
      setVisibleEditar(false);
      setLoading(false);
    }, 2000);
  };
  const handleCancel = () => setVisible(false);
  const handleCancelEditar = () => setVisibleEditar(false);
  const seleccionarRendicionAEditar=(fila)=>{
    setRendicionEditar(fila)
  showModalEditar();
  }

  

  const columns = [
    {
      title: "Item",
      dataIndex: "item",
      key: "item",
    },
    {
      title: "Categorias",
      dataIndex: "categoria",
      key: "categoria",
    },
    {
      title: "Notas",
      dataIndex: "notas",
      key: "notas",
    },
    {
      title: "Importe",
      dataIndex: "importe",
      key: "importe",
    },
    {
      title: "Imagen",
      dataIndex: "imagen",
   
  
    },
    {
      title: "Acciones",
      dataIndex: "acciones",
      key:'acciones',
      render: (f,fila) => (
        <>
        <Link style={{width:'auto' ,borderColor:'#1890ff',borderRadius:'7px'}}  to={`/editar/rendicion/${fila.id}`} > <Button> Agregar Dato</Button></Link> {"   "}
        </>
      ),
    },
  ];
  const filas = usuario?.map((f, i) => {
    return {
      ...f,
      item: i + 1,
      key: f.id,
      imagen: <img src={f.imagen} alt="" style={{width:'100px',height:'70px'}}/>
      
    };
  });


/** editar la rendicion  */
const editarRendicion = async () => {
  let f = new FormData();
  f.append("imagen", rendicionEditar.imagen);
  f.append("importe", rendicionEditar.importe);
  f.append("categoria", rendicionEditar.categoria);
  f.append("notas", rendicionEditar.notas);
  let result = await axiosURL.put(`/rendicion/gastos/${rendicionEditar.id}`, f)
  console.log(result);

}

  return (
    <Col>
    <Link
    to='/crear/rendicion'>
      <Button
        style={{ width: "auto", backgroundColor: "#5cdbd3", marginTop:'10px'}}
      >
        {" "}
      Ingresar
      </Button>
      </Link> 
      <Table
        
        columns={columns}
        dataSource={filas}
      />
      
    </Col>
  );
};
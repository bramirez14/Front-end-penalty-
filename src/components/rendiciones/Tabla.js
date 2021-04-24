import React, { useState } from "react";
import { Table,  Button, Col, Modal, Form, Input, Upload, message } from "antd";
import axiosURL from "../../config/axiosURL";
import {Link} from 'react-router-dom'
import PeticionGET from "../../config/PeticionGET";
export const Tabla = ({
  usuario,
  setUsuario
}) => {
let p=PeticionGET('/gastos')
let id = JSON.parse(localStorage.getItem("id"));
let filtradoUsuariosConMediosDePago= p.filter(d=>d.usuarioId==id)
console.log(filtradoUsuariosConMediosDePago);

/*  let a = usuario?.map(u=> u.formapagoId)
 console.log(a);
 let getFpago = PeticionGET("/mpagos");
 let af= getFpago.find(o=>a==o.id)
 console.log(getFpago); */
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
      title: "Medios de Pago",
      dataIndex: "pago",
      key: "pago",
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
        <Link  to={`/editar/rendicion/${fila.id}`} > <Button style={{width:'auto' ,borderColor:'#1890ff',borderRadius:'10px'}} > Agregar Datos</Button></Link> {"   "}
        </>
      ),
    },
  ];
  const filas =  filtradoUsuariosConMediosDePago?.map((f, i) => {
    return {
      ...f,
      item: i + 1,
      key: f.id,
      imagen: <img src={f.imagen} alt="" style={{width:'100px',height:'70px'}}/>,
    pago:f.formapago.pago 
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
        style={{ width: "auto", backgroundColor: "#69c0ff", marginTop:'10px',borderRadius:'10px'}}
      >
        {" "}
      Ingresar Rendicion
      </Button>
      </Link> 
      <Table
        
        columns={columns}
        dataSource={filas}
      />
      
    </Col>
  );
};
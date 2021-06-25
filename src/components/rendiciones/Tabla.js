import React, { useState } from "react";
import { Table, Button, Col, Modal, Form, Input, Upload, message } from "antd";
import axiosURL from "../../config/axiosURL";
import { Link } from 'react-router-dom'
import PeticionGET from "../../config/PeticionGET";

export const Tabla = ({
  usuario,
  setUsuario,

}) => {
  const id = localStorage.getItem('uid')
  let p = PeticionGET('/gastos')
  let filtradoUsuariosConMediosDePago = p.filter(d => d.usuarioId == id)
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
  const seleccionarRendicionAEditar = (fila) => {
    setRendicionEditar(fila)
    showModalEditar();
  }

  const gastos= PeticionGET(`/${id}`);
  const APROBACION = gastos.gasto?.[gastos?.gasto?.length-1]?.estadoFinal
 
  const columns = [
    {
      title: "N° de Rendicion",
      dataIndex: "id",
      key: "item",
    },

    {
      title: "Fecha",
      dataIndex: "fecha",

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
      title: "Acciones",
      dataIndex: "acciones",
      key: 'acciones',
      render: (f, fila) => (
        <>
          <Link to={`/lista/rendicion/${fila.id}`} > <Button style={{ width: 'auto', borderRadius: '10px' }} > Agregar Rendiciones</Button></Link> {"   "}
        </>
      ),
    },
  ];
  const filasFiltradas = filtradoUsuariosConMediosDePago?.filter(f=>f.estadoFinal==='aprobado')

  const filas = filasFiltradas?.map((f, i) => {
    return {
      ...f,
      item: i + 1,
      key: f.id,
      pago: f.formapago.pago
    };
  });

  /** editar la rendicion  */
  const editarRendicion = async () => {
    let f = new FormData();
    f.append("imagen", rendicionEditar.imagen);
    f.append("importe", rendicionEditar.importe);
    f.append("categoria", rendicionEditar.categoria);
    f.append("notas", rendicionEditar.notas);
    await axiosURL.put(`/rendicion/gastos/${rendicionEditar.id}`, f)
  }

  return (
    <Col>
      <Link
        to='/rendicion'>
        <Button>
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
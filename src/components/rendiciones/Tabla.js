import React, { useState } from "react";
import { Table, Button, Col, Modal, Form, Input, Upload, message } from "antd";
import { axiosURL } from "../../config/axiosURL";
import { Link } from "react-router-dom";
import { PeticionGET } from "../../config/PeticionGET";

export const Tabla = ({ usuario, setUsuario }) => {
  const id = localStorage.getItem("uid");
  let p = PeticionGET("/gastos");
  console.log(p);
  let filtradoUsuariosConMediosDePago = p.filter((d) => d.usuarioId ==(id));

  const [rendicionEditar, setRendicionEditar] = useState({
    notas: "",
    importe: "",
    imagen: "",
    categoria: "",
    deleteId: [],
  });

  const columns = [
    {
      title: "N° de Rendicion",
      dataIndex: "id",
      key: "item",
      width: 100,
    },

    {
      title: "Fecha",
      dataIndex: "fecha",
      width: 100,

    },

    {
      title: "Medios de Pago",
      dataIndex: "pago",
      key: "pago",
      width: 100,

    },
    {
      title: "Notas",
      dataIndex: "notas",
      key: "notas",
      width: 100,

    },
    {
      title: "rendicion",
      key: "sinAnticipo",
      dataIndex: "sinAnticipo",
      width:120,

      render: (state, file) => (
        <>
          {file.sinAnticipo === "sin" ? (
            <span>Sin Anticipo </span>
          ) : (
            <span>Con Anticipo</span>
          )}
        </>
      ),
    },
    {
      title: "Importe",
      dataIndex: "importe",
      key: "importe",
      width: 100,
      render:(state, file)=> (  
        <>
        {file.sinAnticipo==='sin'?
        <h5>{file.importerendido}</h5>
      :
      <h5>{file.importe}</h5>
      }
      </>
      )
      
    },

    {
      title: "Acciones",
      dataIndex: "acciones",
      key: "acciones",
      width: 100,

      render: (f, fila) => {
        console.log(fila.estado);

        return (
          <>
            {fila.estado==='rechazado'?'rechazado':
            
            
            fila.listo === "Si" ? (
              "Completado"
            ) : (
              
              <Link to={`/lista/rendicion/${fila.id}`}>
                
                <Button>
                  Agregar Gasto
                </Button>
              </Link>
            )}
          </>
        );
      },
    },
  ];
  const filasFiltradas = filtradoUsuariosConMediosDePago?.filter(
    (f) => f.estadoFinal === "aprobado" || f.sinAnticipo === "sin"
  );
  console.log(filasFiltradas);
  const filas = filasFiltradas?.map((f, i) => {
    return {
      ...f,
      item: i + 1,
      key: f.id,
      pago: f.formapago.pago,
    };
  });

  /** editar la rendicion  */
  const editarRendicion = async () => {
    let f = new FormData();
    f.append("imagen", rendicionEditar.imagen);
    f.append("importe", rendicionEditar.importe);
    f.append("categoria", rendicionEditar.categoria);
    f.append("notas", rendicionEditar.notas);
    await axiosURL.put(`/rendicion/gastos/${rendicionEditar.id}`, f);
  };

  return (
    <>
      <Link to="/rendicion">
        <Button>Nueva Rendicion</Button>
      </Link>
      <Table columns={columns} dataSource={filas} scroll={{ y: 500 }}  pagination={{
       pageSize: 4,
      }}/>
      </>
  );
};

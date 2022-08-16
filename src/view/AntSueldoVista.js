import React, { useState, useEffect,  } from "react";
import { axiosURL } from "../config/axiosURL";
import {  Table} from "antd";
import { numberWithCommas } from "../components/reportes/helpers/funciones";
import { useNavigate } from "react-router";

export const AntSueldoVista = () => {
  const navigate= useNavigate();
  const N = localStorage.getItem("N");
  const tipo= localStorage.getItem("type");
  const [sueldo, setSueldo] = useState([]);

    /**evitar que usuario distintos a  905 ingresen a la ruta */
    ( N !== "905" && tipo!=='Gerente') && navigate("/perfil");
  

  const get = async () => {
    const { data } = await axiosURL.get("/anticipo");
    setSueldo(data);
  };
  useEffect(() => {
    get();
  }, []);

  
  const filtroListo = sueldo.filter((f) => f.estadoFinal === "aprobado");


  const columns = [
    {
      title: "Numero de Anticipo",
      dataIndex: "id",
      key: "id",
      width: 100,
      render: (state, file) => <h5>#{file.id}</h5>,
    },
    {
      title: "Nombre",
      dataIndex: "nombre",
      key: "nombre",
      width: "100px",
      render: (state, file) => <h5>{file.nombre}</h5>,
    },
    {
      title: "Apellido",
      dataIndex: "apellido",
      key: "apellido",
      width: 100,
      render: (state, file) => <h5>{file.apellido}</h5>,
    },

    {
      title: "Devolucion",
      dataIndex: "sueldo",
      key: "sueldo",
      width: 100,
      render: (state, file) => <h5>{file.sueldo}</h5>,
    },
    {
      title: "Cuotas",
      dataIndex: "cuotas",
      key: "cuotas",
      width: 100,
      render: (state, file) => <h5>{file.cuotas}</h5>,
    },
    {
      title: "Importe",
      dataIndex: "importe",
      key: "importe",
      width: 140,
      render: (state, file) => <h5>${numberWithCommas(file.importe)}</h5>,
    },

   
  
  ];

  const datos = filtroListo?.map((f) => {
    return {
      ...f,
      key: f.id,
      nombre: f.usuario.nombre,
      apellido: f.usuario.apellido,
    };
  });


  return (
    <>
  
      <Table columns={columns} dataSource={datos} />
    </>
  );
};

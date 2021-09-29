import React, { useState, useEffect, useContext } from "react";
import { axiosURL } from "../config/axiosURL";
import {  Button, Table } from "antd";
import { Modale } from "./helpers/Modale";
import { saveAs } from "file-saver";
import { numberWithCommas } from "../components/reportes/helpers/funciones";
import { BiDownload } from "react-icons/bi";
import { PeticionGET } from "../config/PeticionGET";
import { SocketContext } from "../context/SocketContext";

export const AntSueldoVista = ({ history }) => {
  const {socket} = useContext(SocketContext)
  const N = localStorage.getItem("N");
  const [sueldo, setSueldo] = useState([]);
  /**evitar que usuari 905 ingresen a la ruta */
  N !== "905" && history.push("/perfil");

  /* const finalizar= async (id)=>{
let result = await axiosURL.post(`/finalizar/gasto/${id}`,{procesoFinalizado:'Si'})
result.status===200 && history.push('/perfil')
} */

  const get = async () => {
    const { data } = await axiosURL.get("/anticipo");
    setSueldo(data);
  };
  useEffect(() => {
    get();
  }, []);

  const filtroListo = sueldo.filter((f) => f.estadoFinal === "aprobado");
  const descargarPDF = async (pdf) => {
    let res = await axiosURL.get("/pdf/gastos/rendicion", {
      headers: { archivo: pdf },
      responseType: "blob",
    });
    const pdfBlob = await new Blob([res.data], { type: "application/pdf" });
    saveAs(pdfBlob, `${pdf}`);
  };

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
    {
      title: "N° orden",
      dataIndex: "norden",
      key: "norden",
      width: 100,
      render: (state, file) => <h5>{file.norden}</h5>,
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

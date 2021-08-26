import React, { useState, useEffect } from "react";
import { axiosURL } from "../config/axiosURL";
import { Card, Collapse, Button, Row, Col, Table } from "antd";
import { Modale } from "./helpers/Modale";
import { saveAs } from "file-saver";
import { numberWithCommas } from "../components/reportes/helpers/funciones";
import { BiDownload } from 'react-icons/bi';


export const AntSueldoVista = ({ history }) => {
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

  const filtroListo = sueldo.filter(
    (f) =>  f.estadoFinal === "aprobado"
  );
  const descargarPDF = async (pdf) => {
    let res = await axiosURL.get("/pdf/gastos/rendicion", {
      headers: { archivo: pdf },
      responseType: "blob",
    });
    const pdfBlob = await new Blob([res.data], { type: "application/pdf" });
    saveAs(pdfBlob, `${pdf}`);
  };
  console.log(filtroListo);
  const columns = [
    {
      title: "Numero de Anticipo",
      dataIndex: "id",
      key: "id",
      width: "100px",
      render: (state, file) => <span>#{file.id}</span>,
    },
    { title: "Nombre", dataIndex: "nombre", key: "nombre", width: "100px" },
    {
      title: "Apellido",
      dataIndex: "apellido",
      key: "apellido",
      width: "100px",
    },
    { title: "Devolucion", dataIndex: "sueldo", key: "sueldo", width: "100px"},
    { title: "Cuotas", dataIndex: "cuotas", key: "cuotas", width: "100px"},
    { title: "Importe", dataIndex: "importe", key: "importe", width: "140px",render: (state, file) => <span>${numberWithCommas(file.importe)}</span> },
    { title: "N° orden", dataIndex: "norden", key: "norden", width: "100px" },
    {
      title: "PDF Proveedores",
      dataIndex: "pdf",
      key: "pdf",
      width: "100px",
      render: (state, file) => (
        <>
        {file.pdf===null || file.pdf===''?
        <span>No hay pdf!!</span>:
          <Button type="link" onClick={() => descargarPDF(file.pdf)}> <BiDownload/> </Button>
        }
        </>
      ),
    },
    {
      title: "Acciones",
      dataIndex: "acciones",
      key: "acciones",
      width: "10px",
      render: (state, file) => (
        <>
          {file.procesoFinalizado === "Si" ? (
            <span y>Completado</span>
          ) : (
            
            <Modale id={file.id} orden={file.norden} get={get} url={'/sueldo/pdf'} />
          )}
        </>
      ),
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
      <Table
        columns={columns}
        dataSource={datos}
        bordered
      />
    </>
  );
};

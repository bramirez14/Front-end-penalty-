import React, { useState, useEffect } from "react";
import { axiosURL } from "../config/axiosURL";
import { Card, Collapse, Button, Row, Col, Table } from "antd";
import { Modale } from "./helpers/Modale";
import { saveAs } from "file-saver";
import { numberWithCommas } from "../components/reportes/helpers/funciones";
import { BiDownload } from "react-icons/bi";
import { PeticionGET } from "../config/PeticionGET";

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

  const filtroListo = sueldo.filter((f) => f.estadoFinal === "aprobado");
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
    {
      title: "PDF Proveedores",
      dataIndex: "pdf",
      key: "pdf",
      width: 120,
      render: (state, file) => (
        <>
          {file.pdf === null || file.pdf === "" ? (
            <h5>No hay pdf!!</h5>
          ) : (
            <Button type="link" onClick={() => descargarPDF(file.pdf)}>
              <BiDownload />
            </Button>
          )}
        </>
      ),
    },
    {
      title: "Acciones",
      dataIndex: "acciones",
      key: "acciones",
      width: 100,
      render: (state, file) => {
        const gtes= PeticionGET("/gerentes")
        console.log(gtes);
        const gerente=gtes.filter( g=> g.id === file.usuario.gerenteId)
        console.log(file);
        
        const obj={
          ...file,
          msj:'Se cargo el numero de orden y pdf proveedores',
          info:`Tenes un aprobacion de ${file.sueldo}`,
          path:'/pagos/anticipo',
          mailGerente:gerente
      }
        return (
        <>
          {file.procesoFinalizado === "Si" ? (
            <h5 y>Completado</h5>
          ) : (
            <Modale
             obj={obj}
              archivo={file}
              get={get}
              url={"/sueldo/pdf"}
            />
          )}
        </>
      );
    }
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

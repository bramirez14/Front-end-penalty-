import React, { useState, useEffect } from "react";
import { axiosURL } from "../config/axiosURL";
import { saveAs } from "file-saver";
import { Card, Collapse, Button, Row, Col, Table } from "antd";
import { Modale } from "./helpers/Modale";
import { BiDownload } from "react-icons/bi";
import { numberWithCommas } from "../components/reportes/helpers/funciones";

export const RendicionKmVista = ({ history }) => {
  const N = localStorage.getItem("N");
  const [km, setKm] = useState([]);
  /**evitar que usuari 905 ingresen a la ruta */
  N !== "905" && history.push("/perfil");
  const get = async () => {
    const { data } = await axiosURL.get("/todos/kilometros");
    setKm(data);
  };
  useEffect(() => {
    get();
  }, []);
  const filtroListo = km.filter(
    (f) => f.listo === "Si" && f.estadoFinal === "aprobado"
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
      title: "Numero de Rendicion",
      dataIndex: "id",
      key: "id",
      width: 100,
      render: (state, file) => <h5>#{file.id}</h5>,
    },

    {
      title: "Nombre",
      dataIndex: "nombre",
      key: "nombre",
      width: 100,
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
      title: "Km Total",
      dataIndex: "kmTotal",
      key: "kmTotal",
      width: 100,
      render: (state, file) => <h5>{file.kmTotal} Km</h5>,
    },

    {
      title: "Importe total",
      dataIndex: "importeTotal",
      key: "importeTotal",
      width: 100,
      render: (state, file) => <h5>${numberWithCommas(file.importeTotal)}</h5>,
    },

    {
      title: "PDF Provedores",
      dataIndex: "pdf",
      key: "pdf",
      width: 100,
      render: (state, file) => (
        <>
          {file.pdf === null || "" ? (
            <h5>No hay pdf!!</h5>
          ) : (
            <Button type="link" onClick={() => descargarPDF(file.pdf)}>
              <BiDownload />
            </Button>
          )}
        </>
      ),
    }, //cambiar nombre de titulo
    {
      title: "Acciones",
      dataIndex: "acciones",
      key: "acciones",
      width: 100,
      render: (state, file) => (
        <>
          {file.procesoFinalizado === "Si" ? (
            <h5 y>Completado</h5>
          ) : (
            <Modale
              id={file.id}
              orden={file.norden}
              get={get}
              url={"/km/pdf"}
            />
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
      description: (
        <Row gutter={[10, 10]}>
          {f.rendicionKm.map((r) => (
            <>
              <Col xs={4} sm={4} md={4} lg={4} xl={4}>
                <Card
                  style={{
                    width: 200,
                    border: "solid 2px #ddd",
                    height: "auto",
                  }}
                >
                  <p>
                    <b>Fecha:</b> {r.fechaSelect}
                  </p>
                  <p>
                    <b> Km Inicial:</b> {r.KmI}
                  </p>

                  <p>
                    <b>Km Final:</b> ${r.KmF}
                  </p>
                  <p>
                    <b>Km Recorrido :</b> {r.KmRecorrido}
                  </p>
                  <p>
                    <b>Nota :</b> {r.nota}
                  </p>
                  <p>
                    <b>Importe :</b> ${r.importe}
                  </p>
                </Card>
              </Col>
            </>
          ))}
        </Row>
      ),
    };
  });

  return (
    <>
      <Table
        columns={columns}
        expandable={{
          expandedRowRender: (record) => (
            <p style={{ margin: 0 }}>{record.description}</p>
          ),
        }}
        dataSource={datos}
      />
    </>
  );
};
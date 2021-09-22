import React, { useState, useEffect } from "react";
import { axiosURL } from "../config/axiosURL";
import { Card, Button, Row, Col, Table, Image } from "antd";
import { Modale } from "./helpers/Modale";
import { saveAs } from "file-saver";
import { BiDownload } from "react-icons/bi";
import { numberWithCommas } from "../components/reportes/helpers/funciones";
import { PeticionGET } from "../config/PeticionGET";

export const RendicionGastosVista = ({ history }) => {
  const N = localStorage.getItem("N");
  const id = localStorage.getItem('uid')
  const [gasto, setGasto] = useState([]);

  /**evitar que usuari 905 ingresen a la ruta */
  ( N !== "905" && N!== '901' ) && history.push("/perfil");

  /* const finalizar= async (id)=>{
let result = await axiosURL.post(`/finalizar/gasto/${id}`,{procesoFinalizado:'Si'})
result.status===200 && history.push('/perfil')
} */

  const get = async () => {
    const { data } = await axiosURL.get("/gastos");
    setGasto(data);
  };
  useEffect(() => {
    get();
  }, []);

  const filtroListo = gasto.filter(
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
      title: "Fecha",
      dataIndex: "fecha",
      key: "fecha",
      width: 120,
      render: (state, file) => <h5>{file.fecha}</h5>,
    },
    {
      title: "Rendicion",
      dataIndex: "sinAnticipo",
      key: "sinAnticipo",
      width: 140,

      render: (state, file) => (
        <>
          {file.sinAnticipo === "sin" ? (
            <h5> Sin Anticipo </h5>
          ) : (
            <h5> Con Anticipo </h5>
          )}
        </>
      ),
    },
    {
      title: "Importe solicitado",
      dataIndex: "importerendido",
      key: "importerendido",
      width: 170,
      render: (state, file) => (
        <>
          {file.sinAnticipo === "sin" ? (
            <h5 style={{ color: "orange" }}>Sin importe</h5>
          ) : (
            <h5>${numberWithCommas(file.importe)}</h5>
          )}
        </>
      ),
    },
    {
      title: "Importe rendido",
      dataIndex: "importerendido",
      key: "importerendido",
      width: 170,
      lupa: false,
      render: (state, file) => (
        <h5>
          ${numberWithCommas(file.importerendido)}
        </h5>
      ),
    },
    {
      title: "Nota",
      dataIndex: "notas",
      key: "notas",
      width: 100,
      render: (state, file) => <h5>{file.notas}</h5>,
    },

    {
      title: "N° orden",
      dataIndex: "norden",
      key: "norden",
      width: 120,
      render: (state, file) => <h5>{file.norden}</h5>,
    },
    {
      title: "PDF Proveedores",
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
    },
    {
      title: "Acciones",
      dataIndex: "acciones",
      key: "acciones",
      width: 170,
      render: (state, file) => {
        const gtes= PeticionGET("/gerentes")
        const gerente=gtes.filter( g=> g.id === file.usuario.gerenteId)

        const datosUsuario= PeticionGET(`/${id}`)
        const usuarios=PeticionGET('/allusers')
        const filtro906= usuarios.filter(u=> u.nvendedor ==='906')
      const obj={
        alerta:'Se cargo el numero de orden y pdf proveedores',
        info:'Tenes un aprobacion de gasto',
        f: new Date().toLocaleString(),
        nombre:`${datosUsuario.nombre} ${datosUsuario.apellido}`,
        estado:'activa',
        path:'/pagos/gasto',
        emisor:datosUsuario.email,          
        usuarioId:id,
    }
        return(
        <>
          {file.procesoFinalizado === "Si" ? (
            <h5>Completado</h5>
          ) : (
            <Modale
            newobj={obj}
            archivo={file}
              get={get}
              url={"/archivo/pdf"}
              filtro906={filtro906}

            />
          )}
        </>
      );}
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
          {f.rendicion.map((r) => (
            <>
              <Col xs={4} sm={4} md={4} lg={4} xl={4}>
                <Card
                  style={{
                    width: 200,
                    border: "solid 2px #ddd",
                    height: "auto",
                  }}
                >
                  <Image
                    style={{ width: 100, height: 100 }}
                    alt="example"
                    src={r.imagen}
                  />
                  <p>
                    <b>Fecha:</b> {r.fecha}
                  </p>
                  <p>
                    <b>Categoria:</b> {r.categoria}
                  </p>
                  <p>
                    <b>Importe:</b> ${r.importe}
                  </p>
                  <p>
                    <b>Nota:</b> {r.notas}
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
        scroll={{ y: 500 }}
      />
    </>
  );
};

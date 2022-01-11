import React, { useState, useEffect } from "react";
import { axiosURL } from "../config/axiosURL";
import { saveAs } from "file-saver";
import { Card, Collapse, Button, Row, Col, Table, Switch } from "antd";
import { Modale } from "./helpers/Modale";
import { BiDownload } from "react-icons/bi";
import { numberWithCommas } from "../components/reportes/helpers/funciones";
import { PeticionGET } from "../config/PeticionGET";
import { useNavigate } from "react-router";

export const RendicionKmVista = () => {
  const navigate= useNavigate();
  const [state, setState] = useState(false)
  const id= localStorage.getItem('uid')
  const N = localStorage.getItem("N");
  const tipo = localStorage.getItem("type");
  const [km, setKm] = useState([]);
  /**evitar que usuari 905 ingresen a la ruta */
  (N !== "905" && tipo!=='Gerente') && navigate("/perfil");
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
        path:'/pagos/km',
        emisor:datosUsuario.email,          
        usuarioId:id,
      }
        
        return(
        <>
          {file.procesoFinalizado === "Si" ? (
            <h5 y>Completado</h5>
          ) : (
            <Modale
              newobj={obj}
              archivo={file}
              get={get}
              url={"/km/pdf"}
              filtro906={filtro906}
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
  const filterProcesoFinalizado= datos.filter(d=>d.procesoFinalizado === 'Si');
  const filterIncompletos=datos.filter(d=>d.procesoFinalizado !== 'Si');
  return (
    <>
    <Row style={{marginTop:20,marginBottom:20}}><Col span={24}>
      <Switch checkedChildren="Pendientes" unCheckedChildren="Finalizados" defaultChecked onChange={()=>setState(!state)} style={{marginRight:10}} />
    </Col>
    </Row>
      <Table
        columns={columns}
        expandable={{
          expandedRowRender: (record) => (
            <p style={{ margin: 0 }}>{record.description}</p>
          ),
        }}
        dataSource={state? filterProcesoFinalizado:filterIncompletos}

      />
    </>
  );
};

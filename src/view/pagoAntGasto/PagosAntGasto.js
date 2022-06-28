import React, { useState, useEffect } from "react";
import { Col, Descriptions, Row, Switch, Button, Alert } from "antd";
import { axiosURL } from "../../config/axiosURL";
import {
  conAnticipo906,
  enCurso,
  finalizar,
  sinAnticipo906,
} from "./funciones";
import { HelperMODAL } from "../../helpers/HelperMODAL";
import { FormularioSinAnt } from "./FormularioSinAnt";
import { FormularioConAnt } from "./FormularioConAnt";
import { FormularioConAntPago } from "./FormularioConAntPago";
import { columnsant } from "./columnasAntPago";
import { PeticionGET } from "../../config/PeticionGET";
import { numberWithCommas } from "../../components/reportes/helpers/funciones";
import { HelperTABLEobj } from "../../helpers/HelperTABLEobj";
import { Files } from "../../helpers/Files";
import { FormModal } from "../../layout/FormModal";
import { BiDownload } from "react-icons/bi";
import { BiEdit } from "react-icons/bi";
import { saveAs } from "file-saver";

export const PagosAntGasto = () => {
  const [state, setState] = useState(false);
  const [dataGasto, setDataGasto] = useState([]);
  const [stateFile, setStateFile] = useState("");
  const [stateFilefinal, setStateFilefinal] = useState("");
  const [estadoDeGasto, setEstadoDeGasto] = useState("");
  const [stateChange, setStateChange] = useState();

  const getGastos = async () => {
    const { data } = await axiosURL.get("/gastos");
    setDataGasto(data);
  };
  useEffect(() => {
    getGastos();
  }, [estadoDeGasto]);
  const sinAnticipo = sinAnticipo906(dataGasto);
  const conAnticipo = conAnticipo906(dataGasto);
  const anticipoTotal = [...sinAnticipo, ...conAnticipo];

  const descargarPDF = async (pdf) => {
    let res = await axiosURL.get("/pdf/gastos/rendicion", {
      headers: { archivo: pdf },
      responseType: "blob",
    });
    const pdfBlob = await new Blob([res.data], { type: "application/pdf" });
    saveAs(pdfBlob, `${pdf}`);
  };
  const cambioDeEstado = (state) =>{
  
    state?.data.status === 200 && setStateChange(true);
    getGastos();

  }
  //COLUMNAS
  const columns = [
    ...columnsant,
    {
      title: "PDF Proveedores",
      dataIndex: "pdf",
      key: "pdf",
      width: 140,

      render: (state, file) => {
        return (
          <>
            {file.pdf === null || file.pdf === "" ? (
              <h5>No hay pdf</h5>
            ) : (
              <Row>
                <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                  <Button shape="circle" onClick={() => descargarPDF(file.pdf)}>
                    <BiDownload />{" "}
                  </Button>{" "}
                </Col>
                <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                  <FormModal
                    property={{ shape: "circle" }}
                    btnModal={<BiEdit style={{ fontSize: 14 }} />}
                    title={`Editar ${file.pdf}`}
                    url={`/editar/pdf/gastos/${file.id}`}
                    cambio={cambioDeEstado}
                  >
                    <Files />
                  </FormModal>
                </Col>
              </Row>
            )}
          </>
        );
      },
    },
    {
      title: "PDF Pagos",
      dataIndex: "pdfinal",
      key: "pdfinal",
      width: 140,

      render: (state, file) => {
        return (
          <>
            {file.pdfinal === null || file.pdfinal === "" ? (
              <h5>No hay pdf</h5>
            ) : (
              <Row>
                <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                  <Button
                    shape="circle"
                    onClick={() => descargarPDF(file.pdfinal)}
                  >
                    <BiDownload />{" "}
                  </Button>
                </Col>
                <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                  <FormModal
                    property={{ shape: "circle" }}
                    btnModal={<BiEdit style={{ fontSize: 14 }} />}
                    title={`Editar ${file.pdfinal}`}
                    url={`/editar/pdfinal/gastos/${file.id}`}
                    cambio={cambioDeEstado}
                  >
                    <Files />
                  </FormModal>
                </Col>
              </Row>
            )}
          </>
        );
      },
    },
    {
      title: "  PDF Orden pago final ",
      dataIndex: "pdfpagoFinal",
      key: "pdfpagoFinal",
      width: 170,
      render: (state, file) => {
        return (
          <>
            {file.pdfpagoFinal === null || file.pdfpagoFinal === "" ? (
              <h5>No hay pdf</h5>
            ) : (
              <>
                <Row>
                  <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                    <Button
                      shape="circle"
                      onClick={() => descargarPDF(file.pdfpagoFinal)}
                    >
                      <BiDownload />
                    </Button>
                  </Col>
                  <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                    <FormModal
                      property={{ shape: "circle" }}
                      btnModal={<BiEdit style={{ fontSize: 14 }} />}
                      title={`Editar ${file.pdfpagoFinal}`}
                      url={`/editar/pdfpagofinal/gastos/${file.id}`}
                      cambio={cambioDeEstado}
                    >
                      <Files />
                    </FormModal>
                  </Col>
                </Row>
              </>
            )}
          </>
        );
      },
    },
    {
      title: "Acciones",
      key: "acciones",
      width: 120,

      render: (state, file) => (
        <>
          {file.pagoRealizado === "Si" ? (
            <h5>Realizado</h5>
          ) : file.pagoRealizado === "En curso" && file.listo !== "Si" ? (
            <h5> En curso...</h5>
          ) : (
            <>
              {file.sinAnticipo === "sin" ? (
                <HelperMODAL
                  boton={"Completar"}
                  title={"Rendicion sin Anticipo"}
                  Submit={"Finalizar"}
                  Return={"Salir"}
                  click={() =>
                    finalizar(
                      file.id,
                      getGastos,
                      stateFile,
                      setStateFile,
                      stateFilefinal,
                      setStateFilefinal
                    )
                  }
                  noclick={() => {}}
                >
                  <FormularioSinAnt
                    stateFile={stateFile}
                    setStateFile={setStateFile}
                    stateFilefinal={stateFilefinal}
                    setStateFilefinal={setStateFilefinal}
                    orden={file.norden}
                    importeRendido={file.importerendido}
                  />
                </HelperMODAL>
              ) : file.listo === "Si" ? (
                <HelperMODAL
                  boton={"Completar"}
                  title={"Rendicion sin Anticipo"}
                  Submit={"Finalizar"}
                  Return={"Salir"}
                  click={() =>
                    finalizar(
                      file.id,
                      getGastos,
                      stateFile,
                      setStateFile,
                      stateFilefinal,
                      setStateFilefinal
                    )
                  }
                  noclick={() => {}}
                >
                  <FormularioConAnt
                    stateFile={stateFile}
                    stateFilefinal={stateFilefinal}
                    setStateFile={setStateFile}
                    setStateFilefinal={setStateFilefinal}
                    orden={file.norden}
                    importeRendido={file.importerendido}
                    importe={file.importe}
                  />
                </HelperMODAL>
              ) : (
                <HelperMODAL
                  boton={"Completar"}
                  Submit={"Pagado"}
                  Return={"Salir"}
                  click={() => enCurso(file.id, getGastos)}
                  noclick={() => {}}
                >
                  <FormularioConAntPago
                    orden={file.norden}
                    importe={file.importe}
                  />
                </HelperMODAL>
              )}
            </>
          )}
        </>
      ),
    },
  ];
  const formaDepago = PeticionGET("/mpagos");
  const formaPago = (idpago) => {
    const op = formaDepago.find((f) => f.id === idpago);
    return op?.pago;
  };
  const modoRendicion = (modo) => {
    if (modo === "sin") {
      return "Sin Anticipo";
    } else {
      return "Con Anticipo";
    }
  };
  const importeSolicitado = (obj) => (
    <>
      {obj.sinAnticipo === "sin" ? (
        <span style={{ color: "orange" }}>Sin importe</span>
      ) : (
        <span>${numberWithCommas(obj.importe)}</span>
      )}
    </>
  );
  const datos = anticipoTotal?.map((f) => {
    return {
      ...f,
      key: f.id,
      nombre: f.usuario.nombre,
      apellido: f.usuario.apellido,
      description: (
        <Descriptions
          title={`Info ${f.id}`}
          style={{ border: " solid 2px #ddd", padding: 20 }}
        >
          <Descriptions.Item label="Fecha">
            <b>{f.fecha}</b>
          </Descriptions.Item>
          <Descriptions.Item label="Forma de pago">
            <b>{formaPago(f.formapagoId)}</b>
          </Descriptions.Item>
          <Descriptions.Item label="Rendicion">
            <b>{modoRendicion(f.sinAnticipo)}</b>
          </Descriptions.Item>
          <Descriptions.Item label="Importe">
            <b>{importeSolicitado(f)}</b>
          </Descriptions.Item>
        </Descriptions>
      ),
    };
  });
  const filtroPagoRealizado = datos.filter((d) => d.pagoRealizado === "Si");
  const filtroPagoIncompleto = datos.filter((d) => d.pagoRealizado !== "Si");
  /*  const onFinish = (values) => {
    console.log("Received values of form: ", values);
  }; */
  return (
    <>
      {stateChange && (
        <Alert message="Success Tips" type="success" showIcon closable={true} />
      )}

      <Row style={{ marginTop: 20, marginBottom: 20 }}>
        <Col span={24}>
          <Switch
            checkedChildren="Pendientes"
            unCheckedChildren="Finalizados"
            defaultChecked
            onChange={() => setState(!state)}
            style={{ marginRight: 10 }}
          />
        </Col>
      </Row>
      <HelperTABLEobj
        columns={columns}
        data={
          state ? filtroPagoRealizado.reverse() : filtroPagoIncompleto.reverse()
        }
        pagination={false}
        y={500}
        expandible={true}
      />
    </>
  );
};

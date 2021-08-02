import React, { useState, useEffect } from "react";
import { Button, Table } from "antd";
import { axiosURL } from "../config/axiosURL";
import { saveAs } from "file-saver";
import { conAnticipo906, sinAnticipo906 } from "./helpers/funciones";
import { HelperMODAL } from "../helpers/HelperMODAL";
import { FormularioSinAnt } from "./helpers/FormularioSinAnt";
import { FormularioConAnt } from "./helpers/FormularioConAnt";
import { FormularioConAntPago } from "./helpers/FormularioConAntPago";
import Swal from "sweetalert2/dist/sweetalert2.js";

export const PagosAntGasto = ({ history }) => {
  const [dataGasto, setDataGasto] = useState([]);
  const [stateFile, setStateFile] = useState("");
  const getGastos = async () => {
    const { data } = await axiosURL.get("/gastos");
    setDataGasto(data);
  };
  useEffect(() => {
    getGastos();
  }, []);
  const descargarPDF = async (pdf) => {
    let res = await axiosURL.get("/pdf/gastos/rendicion", {
      headers: { archivo: pdf },
      responseType: "blob",
    });
    const pdfBlob = await new Blob([res.data], { type: "application/pdf" });
    saveAs(pdfBlob, `${pdf}`);
  };
  const antGasto = dataGasto;
  const filtroAprobacion = antGasto.filter(
    (q) => q.estadoFinal === "aprobado" && q.procesoFinalizado === "Si"
  );
  const sinAnticipo = sinAnticipo906(dataGasto);
  const conAnticipo = conAnticipo906(dataGasto);
  const anticipoTotal = [...sinAnticipo, ...conAnticipo];
  console.log(anticipoTotal);
  /** funcion para el modal */
  const finalizar = async (id) => {
    if (stateFile === "") {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Ingrese un archivo pdf!",
      });
    }
    const obj = {
      pagoRealizado: "Si",
    };
    const f = new FormData();
    f.append("file", stateFile);
    f.append("pagoRealizado", obj.pagoRealizado);
    await axiosURL.put(`/pago/gasto/${id}`, f);
    setStateFile("");
    getGastos();
  };
  const enCurso = async (id) => {
    await axiosURL.put(`/pago/encurso/${id}`, { pagoRealizado: "En curso" });
    getGastos();
  };

  const columns = [
    {
      title: "N de Ant Gasto",
      dataIndex: "id",
      key: "id",
      width: "80px",
    },
    {
      title: "Nombre",
      dataIndex: "nombre",
      key: "nombre",
    },
    {
      title: "Apellido",
      dataIndex: "apellido",
      key: "apellido",
    },

    {
      title: "Fecha",
      dataIndex: "fecha",
      key: "fecha",
    },

    {
      title: "Importe",
      key: "importerendido",
      dataIndex: "importerendido",
      render: (state, file) => <span> ${file.importerendido}</span>,
    },
    {
      title: "Modalidad",
      key: "sinAnticipo",
      dataIndex: "sinAnticipo",
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
      title: "Estado",
      dataIndex: "estadoFinal",
      key: "estadoFinal",
    },
    {
      title: "N orden",
      dataIndex: "norden",
      key: "norden",
    },
    {
      title: "PDF Proveedores",
      dataIndex: "pdf",
      key: "pdf",
      render: (state, file) => {
        return (
          <>
            {file.pdf === null || file.pdf === "" ? (
              <span>No hay pdf</span>
            ) : (
              <Button type="link" onClick={() => descargarPDF(file.pdf)}>
                pdf
              </Button>
            )}
          </>
        );
      },
    },
    {
      title: "PDF Pagos",
      dataIndex: "pdfinal",
      key: "pdfinal",
      render: (state, file) => {
        return (
          <>
            {file.pdfinal === null || file.pdfinal === "" ? (
              <span>No hay pdf</span>
            ) : (
              <Button type="link" onClick={() => descargarPDF(file.pdfinal)}>
                pdf
              </Button>
            )}
          </>
        );
      },
    },
    {
      title: "Acciones",
      key: "acciones",
      render: (state, file) => (
        <>
          {file.pagoRealizado === "Si" ? (
            <p>Realizado</p>
          ) : file.pagoRealizado === "En curso" ? (
            <p> En curso...</p>
          ) : (
            <>
              {file.sinAnticipo === "sin" ? (
                <HelperMODAL
                  boton={"Completar"}
                  title={"Rendicion sin Anticipo"}
                  Submit={"Finalizar"}
                  Return={"Salir"}
                  click={() => finalizar(file.id)}
                >
                  <FormularioSinAnt
                    stateFile={stateFile}
                    setStateFile={setStateFile}
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
                  click={() => finalizar(file.id)}
                >
                  <FormularioConAnt
                    stateFile={stateFile}
                    setStateFile={setStateFile}
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
                  click={() => enCurso(file.id)}
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
  const datos = anticipoTotal?.map((f) => {
    return {
      ...f,
      key: f.id,
      nombre: f.usuario.nombre,
      apellido: f.usuario.apellido,
    };
  });

  return (
    <Table
      columns={columns}
      dataSource={datos}
      pagination={false}
      bordered={true}
    />
  );
};

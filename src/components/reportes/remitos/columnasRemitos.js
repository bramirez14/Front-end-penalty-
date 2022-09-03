import React from "react";
import { Button } from "antd";
import { saveAs } from "file-saver";
import { axiosURLIntranet } from "../../../config/axiosURL";

export const remitos = [
  {
    title: "N° de Cliente",
    dataIndex: "cliente",
    key: "cliente",
    width: 100,
    render:(state,file)=> <h5>{file.cliente}</h5>,
  },
  {
    title: "Nombre del Cliente",
    dataIndex: "razonsoc",
    key: "razonsoc",
    width: 200,
    render:(state,file)=> <h5>{file.razonsoc}</h5>,
  },
  {
    title: "N° de Vdor",
    dataIndex: "vendedor",
    key: "vendedor",
    width: 100,
    render:(state,file)=> <h5>{file.vendedor}</h5>,
  },
  {
    title: "Nombre del vendedor",
    dataIndex: "apeynom",
    key: "apeynom",
    width: 200,
    render:(state,file)=> <h5>{file.apeynom}</h5>,
  },

  {
    title: "N° de Pedido",
    dataIndex: "PEDIDO",
    key: "PEDIDO",
    width: 140,
    render:(state,file)=> <h5>{file.PEDIDO}</h5>,
  },
  {
    title: "Unidades",
    dataIndex: "UNIDADES",
    key: "UNIDADES",
    width: 120,
    render:(state,file)=> <h5>{file.UNIDADES}</h5>,
  },
  {
    title: "Fecha de Emision",
    dataIndex: "fecemision",
    key: "fecemision",
    width: 140,
    render: (estado, file) => {
      let reducir = file.fecemision?.split("T");
      return <h5>{reducir?.[0]}</h5>;
    },
  },
  {
    title: "N° de Remito",
    dataIndex: "REMITO",
    key: "REMITO",
    width: 170,
    render: (state, file) => (
      <>{file.REMITO === null ? <h5>No hay remito</h5> : <h5>{file.REMITO}</h5>}</>
    ),
  },

  {
    title: "Estado",
    dataIndex: "ESTADO",
    key: "ESTADO",
    width: 200,
    render: (estado, file) => {
      const color = () => {
        switch (file.ESTADO) {
          case "PREPARADO":
            return (
              <h5 style={{ color: "orange" }}>
                <b>PREPARADO</b>
              </h5>
            );
          case "DESPACHADO":
            return <h5 style={{ color: "green" }}>  DESPACHADO</h5>;
          case "EN PREPARACION":
            return <h5 style={{ color: "blue" }}> EN PREPARACION </h5>;
            default:
            return <h5 style={{ color: "red" }}> ANULADO </h5>;
        }
      };
      return <>{color()}</>;
    },
  },
  {
    title: "PDF",
    dataIndex: "pdf",
    key: "pdf",
    width: 100,
    render: (a, file) => {
      const descargarPDF = async (pdf) => {
        let res = await axiosURLIntranet.get("/remitos/pdf", {
          headers: { archivo: pdf },
          responseType: "blob",
        });
        const pdfBlob = await new Blob([res.data], { type: "application/pdf" });
        saveAs(pdfBlob, `${file.pdf}`);
      };
      return <Button type='link' onClick={() => descargarPDF(file.pdf)}>descargar</Button>;
    },
  },
];

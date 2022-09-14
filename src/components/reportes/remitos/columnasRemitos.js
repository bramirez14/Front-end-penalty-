import React from "react";
import { Button } from "antd";
import { saveAs } from "file-saver";
import { axiosURLIntranet } from "../../../config/axiosURL";

export const remitos = [
  {
    title: "N° de Cliente",
    dataIndex: "cliente",
    key: "cliente",
    lupa:true,
    render:(state,file)=> <h5>{file.cliente}</h5>,
  },
  {
    title: "Nombre del Cliente",
    dataIndex: "razonsoc",
    key: "razonsoc",
    lupa:true,
    render:(state,file)=> <h5>{file.razonsoc}</h5>,
  },
  {
    title: "N° de Vdor",
    dataIndex: "vendedor",
    key: "vendedor",
    lupa:true,
    render:(state,file)=> <h5>{file.vendedor}</h5>,
  },
  {
    title: "Nombre del vendedor",
    dataIndex: "apeynom",
    key: "apeynom",
    lupa:true,
    render:(state,file)=> <h5>{file.apeynom}</h5>,
  },

  {
    title: "N° de Pedido",
    dataIndex: "PEDIDO",
    key: "PEDIDO",
    lupa:true,
    render:(state,file)=> <h5>{file.PEDIDO}</h5>,
  },
  {
    title: "Unidades",
    dataIndex: "UNIDADES",
    key: "UNIDADES",
    render:(state,file)=> <h5>{file.UNIDADES}</h5>,
  },
  {
    title: "Fecha de Emision",
    dataIndex: "fecemision",
    key: "fecemision",
    lupa:true,
    render: (estado, file) => {
      let reducir = file.fecemision?.split("T");
      return <h5>{reducir?.[0]}</h5>;
    },
  },
  {
    title: "N° de Remito",
    dataIndex: "REMITO",
    key: "REMITO",
    lupa:true,
    render: (state, file) => (
      <>{file.REMITO === null ? <h5>No hay remito</h5> : <h5>{file.REMITO}</h5>}</>
    ),
  },

  {
    title: "Estado",
    dataIndex: "ESTADO",
    key: "ESTADO",
    lupa:true,
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

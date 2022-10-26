import React from "react";
import { Table } from "antd";
import { useSelector } from "react-redux";
import { PdfoImg } from "../../helpers/PdfoImg";
import { TableSearchAndExpandible } from "../table/TableSearchAndExpandible";
import { HelperTABLEobj } from "../../helpers/HelperTABLEobj";
export const TarjetaCreditoComp = () => {
  const dataSource = useSelector((state) => state.rendiciones.tc);
  const columns = [
    {
      title: "N°",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Nombre",
      dataIndex: "nombre",
      key: "nombre",
      search: true,
    },
    {
      title: "Apellido ",
      dataIndex: "apellido",
      key: "apellido",
    },
    {
      title: "Fecha",
      dataIndex: "fecha",
      key: "fecha",
      render: (state, file) => {
        console.log(file);
        let day = file?.fecha;
        let d = new Date(day).getDate();
        let m = new Date(day).getMonth() + 1;
        let y = new Date(day).getFullYear();
        return <span>{day !== null ? `${d}/${m}/${y}` : "no hay fecha"}</span>;
      },
    },
    {
      title: "Importe ",
      dataIndex: "importe",
      key: "importe",
    },
    {
      title: "Tarjeta ",
      dataIndex: "tarjeta",
      key: "tarjeta",
      search: true,
    },
    {
      title: "Archivo",
      dataIndex: "archivo",
      key: "archivo",
      render: (state, file) => <PdfoImg file={file.archivo} />,
    },
  ];
  return (
    <TableSearchAndExpandible
      title={<h2>Gastos de Tarjeta de Credito</h2>}
      data={dataSource}
      columns={columns}
    />
  );
};

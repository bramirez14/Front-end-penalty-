import React from "react";
import { Table } from "antd";
export const TablaInfkm = ({ data }) => {
  const columns = [
    {
      title: "Fecha",
      dataIndex: "fechaSelect",
      key: "fechaSelect",
    },
    {
      title: "Importe",
      dataIndex: "importe",
      key: "importe",
    },
    {
      title: "Km Inicial",
      dataIndex: "KmI",
      key: "KmI",
    },
    {
      title: "Km Final",
      dataIndex: "KmF",
      key: "KmF",
    },
    {
      title: "Km Recorrido",
      dataIndex: "KmRecorrido",
      key: "KmI",
    },
  ];

  return <Table dataSource={data} columns={columns} pagination={false}/>;
};

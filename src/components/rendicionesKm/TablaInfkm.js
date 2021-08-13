import React from "react";
import { Table } from "antd";
export const TablaInfkm = ({ data }) => {
  const columns = [
    {
      title: "Fecha",
      dataIndex: "fechaSelect",
      key: "fechaSelect",
      width: 50,
      render: (state, file) =><h5>{file.fechaSelect}</h5>
    },
    {
      title: "Importe",
      dataIndex: "importe",
      key: "importe",
      width: 50,
      render: (state, file) =><h5>{file.importe}</h5>
    },
    {
      title: "Km Inicial",
      dataIndex: "KmI",
      key: "KmI",
      width: 50,
      render: (state, file) =><h5>{file.KmI}</h5>

    },
    {
      title: "Km Final",
      dataIndex: "KmF",
      key: "KmF",
      width: 50,
      render: (state, file) =><h5>{file.KmF}</h5>

    },
    {
      title: "Km Recorrido",
      dataIndex: "KmRecorrido",
      key: "KmI",
      width: 50,
      render: (state, file) =><h5>{file.KmRecorrido}</h5>

    },
  ];

  return <Table dataSource={data} columns={columns} pagination={false} />;
};

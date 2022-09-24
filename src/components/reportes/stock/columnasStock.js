import { Tooltip } from "antd";
import { numberWithCommas } from "../helpers/funciones";

export const columnasStock = [
  {
    title: "DEPOSITO",
    dataIndex: "DEPOSITO",
    key: "DEPOSITO",
    lupa: true,
    render: (state, file) => <h5>{file.DEPOSITO}</h5>,
  },
  {
    title: "NOMBRE",
    dataIndex: "NOMBRE",
    key: "NOMBRE",
    lupa: true,
    render: (state, file) => <h5>{file.NOMBRE}</h5>,
  },
  {
    title: "ARTICULO",
    dataIndex: "ARTICULO",
    key: "ARTICULO",
    lupa: true,
    render: (state, file) => <h5>{file.ARTICULO}</h5>,
  },
  {
    title: "DESCRIPCION",
    dataIndex: "DESCRIPCION",
    key: "DESCRIPCION",
    render: (state, file) => <h5>{file.DESCRIPCION}</h5>,
  },
  {
    title: "LINEA",
    dataIndex: "LINEA",
    key: "LINEA",
    render: (state, file) => <h5>{file.LINEA}</h5>,
  },
  {
    title: "CURVA",
    dataIndex: "CURVA",
    key: "CURVA",
    render: (state, file) => <h5>{file.CURVA}</h5>,
  },
  {
    title: "UNIDADES",
    dataIndex: "UNIDADES",
    key: "UNIDADES",
    render: (state, file) => <h5>{numberWithCommas(file.UNIDADES)}</h5>,
  },
  {
    title: (
      <Tooltip title="33-25-18-TU-XS-5" color="#46a461">
        <span>TALLE00</span>
      </Tooltip>
    ),
    dataIndex: "TALLE00",
    key: "TALLE00",
    render: (state, file) => <h5>{file.TALLE00}</h5>,
  },
  {
    title: (
      <Tooltip title="35-27-20-02-M-7" color="#46a461">
        <span>TALLE01</span>
      </Tooltip>
    ),
    dataIndex: "TALLE01",
    key: "TALLE01",
    render: (state, file) => <h5>{file.TALLE01}</h5>,
  },
  {
    title: (
      <Tooltip title="34-26-19-01-S-6" color="#46a461">
        <span>TALLE02</span>
      </Tooltip>
    ),
    dataIndex: "TALLE02",
    key: "TALLE02",
    render: (state, file) => <h5>{file.TALLE02}</h5>,
  },
  {
    title: (
      <Tooltip title="36-28-21-03-L-8" color="#46a461">
        <span>TALLE03</span>
      </Tooltip>
    ),
    dataIndex: "TALLE03",
    key: "TALLE03",
    render: (state, file) => <h5>{file.TALLE03}</h5>,
  },
  {
    title: (
      <Tooltip title="37-29-22-04-XL-9" color="#46a461">
        <span>TALLE04</span>
      </Tooltip>
    ),
    dataIndex: "TALLE04",
    key: "TALLE04",
    render: (state, file) => <h5>{file.TALLE04}</h5>,
  },
  {
    title: (
      <Tooltip title="38-30-23-05-XXL-9.5" color="#46a461">
        <span>TALLE05</span>
      </Tooltip>
    ),
    dataIndex: "TALLE05",
    key: "TALLE05",
    render: (state, file) => <h5>{file.TALLE05}</h5>,
  },
  {
    title: (
      <Tooltip title="39-31-24-S-3XL-10" color="#46a461">
        <span>TALLE06</span>
      </Tooltip>
    ),
    dataIndex: "TALLE06",
    key: "TALLE06",
    render: (state, file) => <h5>{file.TALLE06}</h5>,
  },
  {
    title: (
      <Tooltip title="41-33-26-L-04-11" color="#46a461">
        <span>TALLE07</span>
      </Tooltip>
    ),

    dataIndex: "TALLE07",
    key: "TALLE07",
    render: (state, file) => <h5>{file.TALLE07}</h5>,
  },
  {
    title: (
      <Tooltip title="40-32-25-M-02-10.5" color="#46a461">
        <span>TALLE08</span>
      </Tooltip>
    ),

    dataIndex: "TALLE08",
    key: "TALLE08",
    render: (state, file) => <h5>{file.TALLE08}</h5>,
  },
  {
    title: (
      <Tooltip title="42-34-27-XL-06-12" color="#46a461">
        <span>TALLE09</span>
      </Tooltip>
    ),

    dataIndex: "TALLE09",
    key: "TALLE09",
    render: (state, file) => <h5>{file.TALLE09}</h5>,
  },
  {
    title: (
      <Tooltip title="43-35-28-XXL-08-P" color="#46a461">
        <span>TALLE10</span>
      </Tooltip>
    ),

    dataIndex: "TALLE10",
    key: "TALLE10",
    render: (state, file) => <h5>{file.TALLE10}</h5>,
  },
  {
    title: (
      <Tooltip title="44-36-29-8-10-M" color="#46a461">
        <span>TALLE11</span>
      </Tooltip>
    ),

    dataIndex: "TALLE11",
    key: "TALLE11",
    render: (state, file) => <h5>{file.TALLE11}</h5>,
  },
  {
    title: (
      <Tooltip title="45-37-30-9-12-G" color="#46a461">
        <span>TALLE12</span>
      </Tooltip>
    ),

    dataIndex: "TALLE12",
    key: "TALLE12",
    render: (state, file) => <h5>{file.TALLE12}</h5>,
  },
  {
    title: (
      <Tooltip title="46-38-X-10-14-X" color="#46a461">
        <span>TALLE13</span>
      </Tooltip>
    ),

    dataIndex: "TALLE13",
    key: "TALLE13",
    
    render: (state, file) => <h5>{file.TALLE13}</h5>,
  },
  {
    title: (
      <Tooltip title="XX-39-XX-XX-16-XX" color="#46a461">
        <span>TALLE14</span>
      </Tooltip>
    ),

    dataIndex: "TALLE14",
    key: "TALLE14",
    render: (state, file) => <h5>{file.TALLE14}</h5>,
  },
];

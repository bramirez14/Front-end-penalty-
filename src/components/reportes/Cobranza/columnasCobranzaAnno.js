import { numberWithCommas } from "../helpers/funciones";

export const columnasCobranzasAnno = [

  {
    title: "VENDEDOR",
    dataIndex: "VENDEDOR",
    key: "VENDEDOR",
    lupa: true,
    render: (_, file) => <h5>{file.VENDEDOR}</h5>,
  },
  {
    title: "NOMBRE",
    dataIndex: "APEYNOM",
    key: "APEYNOM",
    lupa: true,
    render: (_, file) => <h5>{file.APEYNOM}</h5>,
  },
  {
    title: "AÑO",
    dataIndex: "ANO",
    key: "ANO",
    render: (_, file) => <h5>{file.ANO}</h5>,
  },
  {
    title: "MES",
    dataIndex: "MES",
    key: "MES",
    render: (_, file) => <h5>{file.MES}</h5>,
  },
  {
    title: "CLIENTE",
    dataIndex: "CLIENTE",
    key: "CLIENTE",
    lupa: true,
    render: (_, file) => <h5>{file.CLIENTE}</h5>,
  },
  {
    title: "RAZON SOCIAL",
    dataIndex: "RAZONSOC",
    key: "RAZONSOC",
    lupa: true,
    render: (_, file) => <h5>{file.RAZONSOC}</h5>,
  },
  {
    title: "COBRANZA",
    dataIndex: "COBRANZA",
    key: "COBRANZA",
    render: (_, file) => <h5>${numberWithCommas(file.COBRANZA)}</h5>,
  },
  {
    title: "COMISION",
    dataIndex: "COMISION",
    key: "COMISION",
    render: (_, file) => <h5>${numberWithCommas(file.COMISION)}</h5>,
  },
];

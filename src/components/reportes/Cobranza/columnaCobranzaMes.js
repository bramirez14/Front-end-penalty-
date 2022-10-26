import { numberWithCommas } from "../helpers/funciones";

export const columnasCobranzasMes = [

  {
    title: "VENDEDOR",
    dataIndex: "VENDEDOR",
    key: "VENDEDOR",       
    lupa:true,
    render: (state, file) => <h5>{file.VENDEDOR}</h5>,
  },
  {
    title: "NOMBRE",
    dataIndex: "NOMBRE",
    key: "NOMBRE",       
    lupa:true,
    render: (state, file) => <h5>{file.NOMBRE}</h5>,
  },
  {
    title: "ANO",
    dataIndex: "ANO",
    key: "ANO",       
    lupa:true,
    render: (state, file) => <h5>{file.ANO}</h5>,
  },
  {
    title: "MES",
    dataIndex: "MES",
    key: "MES",       
    lupa:true,
    render: (state, file) => <h5>{file.MES}</h5>,
  },
  {
    title: "CLIENTE",
    dataIndex: "CLIENTE",
    key: "CLIENTE",
    lupa:true,
    render: (state, file) => <h5>{file.CLIENTE}</h5>,
  },
  {
    title: "RAZON SOCIAL",
    dataIndex: "RAZONSOC",
    key: "RAZONSOC",
    lupa:true,
    render: (state, file) => <h5>{file.RAZONSOC}</h5>,
  },
  {
    title: "COBRANZA",
    dataIndex: "COBRANZA",
    key: "COBRANZA",
    render: (state, file) => <h5>${numberWithCommas(file.COBRANZA)}</h5>,
  },
  {
    title: "COMISION",
    dataIndex: "COMISION",
    key: "COMISION",
    render: (state, file) => <h5>${numberWithCommas(file.COMISION)}</h5>,
  },
];

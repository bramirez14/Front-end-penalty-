import { numberWithCommas } from "../helpers/funciones";

export const columnasPendAgrupCliente = [
  {
    title: "Vendedor",
    dataIndex: "vendedor",
    key: "vendedor",
    render: (state, file) => <h5>{file.vendedor}</h5>,
  },
  {
    title: "Cliente",
    dataIndex: "cliente",
    key: "cliente",
    lupa:true,
    render: (state, file) => <h5>{file.cliente}</h5>,
  },
  {
    title: "Razon Social",
    dataIndex: "razonsoc",
    key: "razonsoc",
    lupa:true,
    render: (state, file) => <h5>{file.razonsoc}</h5>,
  },
  {
    title: "Pendiente",
    dataIndex: "pendiente",
    key: "pendiente",
    lupa:true,
    render: (state, file) => <h5>{file.pendiente}</h5>,
  },
  {
    title: "Importe",
    dataIndex: "importe",
    key: "importe",
    render: (state, file) => <h5>${numberWithCommas(file.importe)}</h5>,
  },
];

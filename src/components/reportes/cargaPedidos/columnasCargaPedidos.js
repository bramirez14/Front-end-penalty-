import { numberWithCommas } from "../helpers/funciones";

export const columnasCargaPedidos = [
  {
    title: "Tipo",
    dataIndex: "tipo",
    key: "tipo",
    lupa:true,
    render: (state, file) => <h5>{file.tipo}</h5>,
  },
  {
    title: "Vendedor",
    dataIndex: "vendedor",
    key: "vendedor",
    lupa:true,
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
    title: "Numero",
    dataIndex: "nroped",
    key: "nroped",
    lupa:true,
    render: (state, file) => <h5>{file.nropend}</h5>,
  },
  {
    title: "Inhabilitado",
    dataIndex: "fecinhab",
    key: "fecinhab",
    render: (state, file) => <h5>{file.fecinhab}</h5>,
  },
  {
    title: "Fecha",
    dataIndex: "fecha",
    key: "fecha", 
    lupa:true,
    render: (state, file) => <h5>{file.fecha}</h5>,
  },
  {
    title: "Pedido",
    dataIndex: "pedido",
    key: "pedido",
    lupa:true,
    render: (state, file) => <h5>{file.pedido}</h5>,
  },
  {
    title: "Asignado",
    dataIndex: "asignado",
    key: "asignado",
    lupa:true,
    render: (state, file) => <h5>{file.asignado}</h5>,
  },
  {
    title: "Facturado",
    dataIndex: "facturado",
    key: "facturado",
    lupa:true,
    render: (state, file) => <h5>${numberWithCommas(file.facturado)}</h5>,
  },
];

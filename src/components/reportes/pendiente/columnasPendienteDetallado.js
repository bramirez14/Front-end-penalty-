import { numberWithCommas } from "../helpers/funciones";

export const columnasPendienteDetallado = [
  {
    title: "Entrega",
    dataIndex: "entrega",
    key: "entrega",
    width:120,
    render: (state, file) => {
    const fecha = file.entrega.split('T')[0]
    return<h5>{fecha}</h5>
    },
  },
  {
    title: "Pedido",
    dataIndex: "pedido",
    key: "pedido",
    width:140,

    render: (state, file) => <h5>{file.pedido}</h5>,
  },
  {
    title: "Vdor",
    dataIndex: "vendedor",
    key: "vendedor",
    width:100,
    render: (state, file) => <h5>{file.vendedor}</h5>,
  },
  {
    title: "Cliente",
    dataIndex: "cliente",
    key: "cliente",
    width:100,
    render: (state, file) => <h5>{file.cliente}</h5>,
  },
  {
    title: "Razon Social",
    dataIndex: "razonsoc",
    key: "razonsoc",
    width:200,
    render: (state, file) => <h5>{file.razonsoc}</h5>,
  },
  {
    title: "Condicion",
    dataIndex: "condventa",
    key: "condventa",
    width:120,

    render: (state, file) => <h5>{file.condventa}</h5>,
  },
  {
    title: "Bonificacion",
    dataIndex: "bonifica",
    key: "bonifica",
    width:140,
    render: (state, file) => <h5>{file.bonifica}</h5>,
  },
  {
    title: "Articulo",
    dataIndex: "articulo",
    key: "articulo",
    width:200,
    render: (state, file) => <h5>{file.articulo}</h5>,
  },
  {
    title: "Descripcion",
    dataIndex: "descrip",
    key: "descrip",
    width:270,
    render: (state, file) => <h5>{file.descrip}</h5>,
  },
  {
    title: "Pendiente",
    dataIndex: "pendiente",
    key: "pendiente",
    width:120,

    render: (state, file) => <h5>{file.pendiente}</h5>,
  },
  {
    title: "Precio",
    dataIndex: "precio",
    key: "precio",
    width:120,

    render: (state, file) => <h5>${numberWithCommas(file.precio)}</h5>,
  },
  {
    title: "Total",
    dataIndex: "total",
    key: "total",
    width:120,

    render: (state, file) => <h5>${numberWithCommas(file.total)}</h5>,
  },
];

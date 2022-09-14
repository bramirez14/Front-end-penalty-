import { numberWithCommas } from "../helpers/funciones";

export const columnasPendienteDetallado = [
  {
    title: "Entrega",
    dataIndex: "entrega",
    key: "entrega",
    lupa:true,
    render: (state, file) => {
    const fecha = file.entrega.split('T')[0]
    return<h5>{fecha}</h5>
    },
  },
  {
    title: "Pedido",
    dataIndex: "pedido",
    key: "pedido",
    lupa:true,
    render: (state, file) => <h5>{file.pedido}</h5>,
  },
  {
    title: "Vdor",
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
    title: "Condicion",
    dataIndex: "condventa",
    key: "condventa",
    render: (state, file) => <h5>{file.condventa}</h5>,
  },
  {
    title: "Bonificacion",
    dataIndex: "bonifica",
    key: "bonifica",
    render: (state, file) => <h5>{file.bonifica}</h5>,
  },
  {
    title: "Articulo",
    dataIndex: "articulo",
    key: "articulo",
    lupa:true,
    render: (state, file) => <h5>{file.articulo}</h5>,
  },
  {
    title: "Descripcion",
    dataIndex: "descrip",
    key: "descrip",
    render: (state, file) => <h5>{file.descrip}</h5>,
  },
  {
    title: "Pendiente",
    dataIndex: "pendiente",
    key: "pendiente",
    render: (state, file) => <h5>{file.pendiente}</h5>,
  },
  {
    title: "Precio",
    dataIndex: "precio",
    key: "precio",
    render: (state, file) => <h5>${numberWithCommas(file.precio)}</h5>,
  },
  {
    title: "Total",
    dataIndex: "total",
    key: "total",
    render: (state, file) => <h5>${numberWithCommas(file.total)}</h5>,
  },
];

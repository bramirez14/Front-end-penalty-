import { dateFormatDDMMYYYY, numberWithCommas } from "../helpers/funciones";

export const columnasCargaPedidos = [
  /* 
  Leer datos de SQL, Vista “VW_PEDIDOS_CARGADOS”
b.	Orden de Campos (TIPO, VENDEDOR, CLIENTE, RAZON SOCIAL, NRO DE PEDIDO, INHABILITADO, MOTIVO, EMISION, PEDIDO, ASIGNADO, FACTURADO)
c.	Filtros en (TIPO, VENDEDOR CLIENTE, RAZON SOCIAL)
 */

  {
    title: "TIPO",
    dataIndex: "TIPO",
    key: "TIPO",
    lupa:true,
    render: (_, file) => <h5>{file.TIPO}</h5>,
  },
  {
    title: "VENDEDOR",
    dataIndex: "VENDEDOR",
    key: "VENDEDOR",
    lupa:true,
    render: (_, file) => <h5>{file.VENDEDOR}</h5>,
  },
  {
    title: "CLIENTE",
    dataIndex: "CLIENTE",
    key: "CLIENTE",
    lupa:true,
    render: (_, file) => <h5>{file.CLIENTE}</h5>,
  },
  {
    title: "RAZON SOCIAL",
    dataIndex: "RAZONSOC",
    key: "RAZONSOC",
    lupa:true,
    render: (_, file) => <h5>{file.RAZONSOC}</h5>,
  },
  {
    title: "NRO DE PEDIDO",
    dataIndex: "NROPED",
    key: "NROPED",
    render: (_, file) => <h5>{file.NROPED}</h5>,
  },
  {
    title: "INHABILITADO",
    dataIndex: "INHABILITADO",
    key: "INHABILITADO",
    render: (_, file) => <h5>{dateFormatDDMMYYYY(file.INHABILITADO)}</h5>,
  },
  
  {
    title: "MOTIVO",
    dataIndex: "MOTIVO",
    key: "MOTIVO",
    render: (_, file) => <h5>{file.MOTIVO}</h5>,
  },
  {
    title: "FECEMISION",
    dataIndex: "FECEMISION",
    key: "FECEMISION", 
    render: (_, file) => <h5>{dateFormatDDMMYYYY(file.FECEMISION)}</h5>,
  },
  {
    title: "PEDIDO",
    dataIndex: "PEDIDO",
    key: "PEDIDO",
    render: (_, file) => <h5>{file.PEDIDO}</h5>,
  },
  {
    title: "ASIGNADO",
    dataIndex: "ASIGNADO",
    key: "ASIGNADO",
    render: (_, file) => <h5>{file.ASIGNADO}</h5>,
  },
  {
    title: "FACTURADO",
    dataIndex: "FACTURADO",
    key: "FACTURADO",
    render: (_, file) => <h5>${numberWithCommas(file.FACTURADO)}</h5>,
  },
];

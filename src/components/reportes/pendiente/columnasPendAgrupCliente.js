import { dateFormatDDMMYYYY, numberWithCommas } from "../helpers/funciones";

export const columnasPendAgrupCliente = [
  /* Agrupado por Cliente
i.	Leer datos del SQL, vista “VW_PENDIENTE_WEB_AGRUP”
ii.	Orden de Columnas (ENTREGA, VENDEDOR, CLIENTE, RAZON SOCIAL, UNIDADES, IMPORTE, BONIFICACION)
iii.	Filtros en (ENTREGA, VENDEDOR, CLIENTE) */

{
  title: "ENTREGA",
  dataIndex: "ENTREGA",
  key: "ENTREGA",
  lupa:true,
  render: (_, file) => <h5>{dateFormatDDMMYYYY(file.ENTREGA)}</h5>,
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
    render: (_, file) => <h5>{file.RAZONSOC}</h5>,
  },
  {
    title: "UNIDADES",
    dataIndex: "UNIDADES",
    key: "UNIDADES",
    render: (_, file) => <h5>{file.UNIDADES}</h5>,
  },
  {
    title: "IMPORTE",
    dataIndex: "IMPORTE",
    key: "IMPORTE",
    render: (_, file) => <h5>${numberWithCommas(file.IMPORTE)}</h5>,
  }, 
  {
    title: "BONIFICACION",
    dataIndex: "BONIFICACION",
    key: "BONIFICACION",
    render: (_, file) => <h5>{file.BONIFICACION}</h5>,
  },
];

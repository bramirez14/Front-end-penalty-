import { dateFormatDDMMYYYY, numberWithCommas } from "../helpers/funciones";

export const columnasPendienteDetallado = [

  {
    title: "FECEMISION",
    dataIndex: "FECEMISION",
    key: "FECEMISION",
    
    render: (_, file) => <h5>{dateFormatDDMMYYYY(file.FECEMISION)}</h5>,
  },
  {
    title: "CODIGO",
    dataIndex: "CODIGO",
    key: "CODIGO",
    render: (_, file) => <h5>{file.CODIGO}</h5>,
  },
  {
    title: "PEDIDO",
    dataIndex: "NROPED",
    key: "NROPED",
    lupa:true,
    render: (_, file) => <h5>{file.NROPED}</h5>,
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
    title: "VDOR",
    dataIndex: "VENDEDOR",
    key: "VENDEDOR",
    lupa:true,
    render: (state, file) => <h5>{file.VENDEDOR}</h5>,
  },

  {
    title: "CONDVENTA",
    dataIndex: "CONDVENTA",
    key: "CONDVENTA",
    render: (_, file) => <h5>{file.CONDVENTA}</h5>,
  },
  {
    title: "BONIFICA",
    dataIndex: "BONIFICA",
    key: "BONIFICA",
    render: (_, file) => <h5>{file.BONIFICA}</h5>,
  },

  {
    title: "ARTICULO",
    dataIndex: "ARTICULO",
    key: "ARTICULO",
    lupa:true,
    render: (state, file) => <h5>{file.ARTICULO}</h5>,
  },
  {
    title: "DESCRIP",
    dataIndex: "DESCRIP",
    key: "DESCRIP",
    lupa:true,
    render: (_, file) => <h5>{file.DESCRIP}</h5>,
  },
  {
    title: "PRECIO",
    dataIndex: "PRECIO",
    key: "PRECIO",
    render: (state, file) => <h5>{numberWithCommas(file.PRECIO)}</h5>,
  },
  {
    title: "IMPORTE",
    dataIndex: "IMPORTE",
    key: "IMPORTE",
    render: (_, file) => <h5>{numberWithCommas(file.IMPORTE)}</h5>,
  },
  {
    title: "BONIFICACION",
    dataIndex: "BONIFICACION",
    key: "BONIFICACION",
    render: (state, file) => <h5>{numberWithCommas(file.BONIFICACION)}</h5>,
  },
  
  {
    title: "TOTAL",
    dataIndex: "TOTAL",
    key: "TOTAL",
    render: (state, file) => <h5>{file.TOTAL}</h5>,
  },
 
  {
    title: "TALLE00",
    dataIndex: "TALLE",
    key: "TALLE",
    render: (state, file) => <h5>{file.TALLE00}</h5>,
  },
  {
    title: "TALLE01",
    dataIndex: "TALLE",
    key: "TALLE",
    render: (state, file) => <h5>{file.TALLE01}</h5>,
  },
  {
    title: "TALLE02",
    dataIndex: "TALLE",
    key: "TALLE",
    render: (state, file) => <h5>{file.TALLE02}</h5>,
  },
  {
    title: "TALLE03",
    dataIndex: "TALLE",
    key: "TALLE",
    render: (state, file) => <h5>{file.TALLE03}</h5>,
  },
  {
    title: "TALLE04",
    dataIndex: "TALLE04",
    key: "TALLE04",
    render: (state, file) => <h5>{file.TALLE04}</h5>,
  },
  {
    title: "TALLE05",
    dataIndex: "TALLE05",
    key: "TALLE05",
    render: (state, file) => <h5>{file.TALLE05}</h5>,
  },
  {
    title: "TALLE06",
    dataIndex: "TALLE06",
    key: "TALLE06",
    render: (state, file) => <h5>{file.TALLE06}</h5>,
  },
  {
    title: "TALLE07",
    dataIndex: "TALLE07",
    key: "TALLE07",
    render: (state, file) => <h5>{file.TALLE07}</h5>,
  },
  {
    title: "TALLE08",
    dataIndex: "TALLE08",
    key: "TALLE08",
    render: (state, file) => <h5>{file.TALLE08}</h5>,
  },
  {
    title: "TALLE09",
    dataIndex: "TALLE09",
    key: "TALLE09",
    render: (state, file) => <h5>{file.TALLE09}</h5>,
  },
  {
    title: "TALLE10",
    dataIndex: "TALLE10",
    key: "TALLE10",
    render: (state, file) => <h5>{file.TALLE10}</h5>,
  },
  {
    title: "TALLE11",
    dataIndex: "TALLE11",
    key: "TALLE11",
    render: (state, file) => <h5>{file.TALLE11}</h5>,
  },{
    title: "TALLE12",
    dataIndex: "TALLE12",
    key: "TALLE12",
    render: (state, file) => <h5>{file.TALLE12}</h5>,
  },
  {
    title: "TALLE13",
    dataIndex: "TALLE13",
    key: "TALLE13",
    render: (state, file) => <h5>{file.TALLE13}</h5>,
  },
  {
    title: "TALLE14",
    dataIndex: "TALLE14",
    key: "TALLE14",
    render: (state, file) => <h5>{file.TALLE14}</h5>,
  },
  {
    title: "ENTREGA",
    dataIndex: "Entart",
    key: "Entart",
    lupa:true,
    render: (state, file) => <h5>{dateFormatDDMMYYYY(file.Entart)}</h5>,
  },
  {
    title: "CODTALLE",
    dataIndex: "CODTALLE",
    key: "CODTALLE",
    render: (state, file) => <h5>{file.CODTALLE}</h5>,
  },


];

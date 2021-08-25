export const columnasFutIngresos = [
  {
    title: "Año",
    dataIndex: "ano",
    key: "ano",
    width:240,
    render: (state, file) => <h5>{file.ano}</h5>,
  },
  {
    title: "Mes",
    dataIndex: "mes",
    key: "mes",
    width:240,
    render: (state, file) => <h5>{file.mes}</h5>,
  },
  {
    title: "Articulo",
    dataIndex: "articulo",
    key: "articulo",
    width:240,
    render: (state, file) => <h5>{file.articulo}</h5>,
  },
  {
    title: "Descripcion",
    dataIndex: "descripcion",
    key: "descripcion",
    width:270,
    render: (state, file) => <h5>{file.descripcion}</h5>,
  },
  {
    title: "Unidades",
    dataIndex: "unidades",
    key: "unidades",
    width:120,

    render: (state, file) => <h5>{file.unidades}</h5>,
  },
];

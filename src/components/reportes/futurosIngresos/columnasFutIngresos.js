export const columnasFutIngresos = [
  {
    title: "Año",
    dataIndex: "ano",
    key: "ano",
    render: (state, file) => <h5>{file.ano}</h5>,
  },
  {
    title: "Mes",
    dataIndex: "mes",
    key: "mes",
    render: (state, file) => <h5>{file.mes}</h5>,
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
    dataIndex: "descripcion",
    key: "descripcion",
    render: (state, file) => <h5>{file.descripcion}</h5>,
  },
  {
    title: "Unidades",
    dataIndex: "unidades",
    key: "unidades",
    render: (state, file) => <h5>{file.unidades}</h5>,
  },
];

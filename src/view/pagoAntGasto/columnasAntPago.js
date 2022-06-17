



export const columnsant = [
  {
    title: "N de Ant Gasto",
    dataIndex: "id",
    key: "id",
    width: 100,
    render: (state, file) => <h5>{file.id}</h5>,
  },
  {
    title: "Nombre",
    dataIndex: "nombre",
    key: "nombre",
    width: 100,
    render: (state, file) => <h5>{file.nombre}</h5>,
  },
  {
    title: "Apellido",
    dataIndex: "apellido",
    key: "apellido",
    width: 140,
    render: (state, file) => <h5>{file.apellido}</h5>,
  },

  {
    title: "Estado",
    dataIndex: "estadoFinal",
    key: "estadoFinal",
    width: 120,
    render: (state, file) => <h5>{file.estadoFinal}</h5>,
  },
  {
    title: "N orden",
    dataIndex: "norden",
    key: "norden",
    width: 140,
    render: (state, file) => <h5>{file.norden}</h5>,
  },
  
];

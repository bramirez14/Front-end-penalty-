export const columnasSCC = [
  {
    title: "id",
    dataIndex: "id",
    key: "id",
    width:100,
    render: (state, file) => <h5>{file.id}</h5>,
  },
  {
    title: "Fecha",
    dataIndex: "fecemision",
    key: "fecemision",
    width:120,
    render: (state, file) => <h5>{file.fecemision}</h5>,
  },
  {
    title: "Nombre",
    dataIndex: "nombre",
    key: "nombre",
    width:100,
    render: (state, file) => <h5>{file.nombre}</h5>,
  },
  {
    title: "SCC",
    dataIndex: "nroscc",
    key: "nroscc",
    width:100,
    render: (state, file) => <h5>{file.nroscc}</h5>,
  },
  {
    title: "Vendedor",
    dataIndex: "vendedor",
    key: "vendedor",
    width:120,
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
    title: "Cant Pedido",
    dataIndex: "cantped",
    key: "cantped",
    width:100,
    render: (state, file) => <h5>{file.cantped}</h5>,
  },
  {
    title: "Deposito",
    dataIndex: "aprobdep",
    key: "aprobdep",
    width:120,
    render: (state, file) => <h5>{file.aprobdep}</h5>,
  },
  {
    title: "Rechazada",
    dataIndex: "rechazado",
    key: "rechazado",
    width:120,
    render: (state, file) => <h5>{file.rechazado}</h5>,
  },
  {
    title: "Creditos",
    dataIndex: "aprobcred",
    key: "creditos",
    width:100,
    render: (state, file) => <h5>{file.creditos}</h5>,
  },
  {
    title: "Pedidos",
    dataIndex: "nrocomp",
    key: "nrocomp",
    width:120,
    render: (state, file) => <h5>{file.nrocomp}</h5>,
  },
];
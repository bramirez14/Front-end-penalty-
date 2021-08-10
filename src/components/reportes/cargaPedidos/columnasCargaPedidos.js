export const columnasCargaPedidos = [
  {
    title: "Tipo",
    dataIndex: "tipo",
    key: "tipo",
    width: "120px",
    render: (state, file) => <h5>{file.tipo}</h5>,
  },
  {
    title: "Vendedor",
    dataIndex: "vendedor",
    key: "vendedor",
    width: "120px",
    render: (state, file) => <h5>{file.vendedor}</h5>,
  },
  {
    title: "Cliente",
    dataIndex: "cliente",
    key: "cliente",
    width: "120px",
    render: (state, file) => <h5>{file.cliente}</h5>,
  },
  {
    title: "Razon Social",
    dataIndex: "razonsoc",
    key: "razonsoc",
    width: "200px",
    render: (state, file) => <h5>{file.razonsoc}</h5>,
  },
  {
    title: "Numero",
    dataIndex: "nroped",
    key: "nroped",
    width: "120px",
    render: (state, file) => <h5>{file.nropend}</h5>,
  },
  {
    title: "Inhabilitado",
    dataIndex: "fecinhab",
    width: "140px",
    key: "fecinhab",
    render: (state, file) => <h5>{file.fecinhab}</h5>,
  },
  {
    title: "Fecha",
    dataIndex: "fecha",
    key: "fecha", 
    width: "120px",
    render: (state, file) => <h5>{file.fecha}</h5>,
  },
  {
    title: "Pedido",
    dataIndex: "pedido",
    key: "pedido",
    width: "120px",
    render: (state, file) => <h5>{file.pedido}</h5>,
  },
  {
    title: "Asignado",
    dataIndex: "asignado",
    key: "asignado",
    width: "120px",

    render: (state, file) => <h5>{file.asignado}</h5>,
  },
  {
    title: "Facturado",
    dataIndex: "facturado",
    key: "facturado",
    width: "120px",

    render: (state, file) => <h5>{file.facturado}</h5>,
  },
];

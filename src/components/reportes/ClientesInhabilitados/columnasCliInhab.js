export const columnasCliInhab = [
  /* Orden de Campos (VENDEDOR, NOMBRE, CLIENTE, RAZON SOCIAL, INHABILITADO, MOTIVO)
c.	Filtros en (VENDEDOR, NOMBRE, CLIENTE, RAZON SOCIAL) */

  {
    title: "VENDEDOR",
    dataIndex: "VENDEDOR",
    key: "VENDEDOR",
    lupa:true,
    render: (state, file) => <h5>{file.VENDEDOR}</h5>,
  },
  {
    title: "NOMBRE",
    dataIndex: "NOMBRE",
    key: "NOMBRE",
    lupa:true,
    render: (state, file) => <h5>{file.NOMBRE}</h5>,
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
    title: "INHABILITADO",
    dataIndex: "INHABILITADO",
    key: "INHABILITADO",
    render: (state, file) => <h5>{file.INHABILITADO}</h5>,
  },
  
  {
    title: "MOTIVO",
    dataIndex: "MOTIVO",
    key: "MOTIVO",
    render: (state, file) => <h5>{file.MOTIVO}</h5>,
  },
];

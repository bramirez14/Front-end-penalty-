export const columnasCliInhab = [
  {
    title: "Vendedor",
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
    title: "Fecha",
    dataIndex: "fecinhab",
    key: "fecinhab",
    lupa:true,
    render: (state, file) => {
      const fecha = file.fecinhab.split("T")[0];
      return <h5>{fecha}</h5>;
    },
  },
  {
    title: "Motivo",
    dataIndex: "motivo",
    key: "motivo",
    render: (state, file) => <h5>{file.motivo}</h5>,
  },
];

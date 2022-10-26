export const columnasFutIngresos = [
  
  {
    title: "AÑO",
    dataIndex: "ANO",
    key: "ANO",
    lupa:true,
    render: (state, file) => <h5>{file.ANO}</h5>,
  },
  {
    title: "MES",
    dataIndex: "MES",
    key: "MES",
    lupa:true,
    render: (state, file) => <h5>{file.MES}</h5>,
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
    render: (state, file) => <h5>{file.DESCRIP}</h5>,
  },
  {
    title: "UNIDADES",
    dataIndex: "UNIDADES",
    key: "UNIDADES",
    render: (state, file) => <h5>{file.UNIDADES}</h5>,
  },
  {
    title: "FECHA",
    dataIndex: "FECHA",
    key: "FECHA",
    render: (state, file) => {
      const date= new Date(file.FECHA)
   const year= date.getFullYear();
   const month = date.getMonth();
   const day = date.getDate();
    return<h5>{day}/{month}/{year}</h5>},
  },
  
];

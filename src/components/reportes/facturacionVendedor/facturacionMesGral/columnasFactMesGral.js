export const columnasFactMes=[
    {
        title: 'Categoria',
        dataIndex: 'categoria',
        key: 'categoria',
        render:(state,file)=> <h5>{file.categoria}</h5>,
      },
      {
        title: 'Unidades',
        dataIndex: 'unidades',
        key: 'unidades',
        render:(state,file)=> <h5>{file.unidades}</h5>,

      },
      {
        title: 'Importe',
        dataIndex: 'importe',
        key: 'importe',
        render:(state,file)=> <h5>{file.importe}</h5>,

      },
    
]
export const columnasFactAnno=[
    {
        title: 'Vendedor',
        dataIndex: 'vendedor',
        key: 'vendedor',
       width: 120,
        render:(state,file)=> <h5>{file.vendedor}</h5>,
      },
      {
        title: 'Cliente',
        dataIndex: 'numctacte',
        key: 'numctacte',
       width: 120,
        render:(state,file)=> <h5>{file.numctacte}</h5>  ,
      },
      {
        title: 'Razon Social',
        dataIndex: 'razonsoc',
        key: 'razonsoc',
        width: 200,
        render:(state,file)=> <h5>{file.razonsoc}</h5>  ,
      },
      {
        title: 'Unidades',
        dataIndex: 'unidades',
        key: 'unidades',
        width: 120,
        render:(state,file)=> <h5>{file.unidades}</h5>,
      },
      {
        title: 'Importe',
        dataIndex: 'importe',
        key: 'importe',
        render:(state,file)=> <h5>{file.importe}</h5>,
        width: 120,
      
      },
]
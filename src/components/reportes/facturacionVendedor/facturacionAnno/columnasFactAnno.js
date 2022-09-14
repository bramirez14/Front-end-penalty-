import { numberWithCommas } from "../../helpers/funciones";

export const columnasFactAnno=[
    {
        title: 'Vendedor',
        dataIndex: 'vendedor',
        key: 'vendedor',
        lupa:true,
        render:(state,file)=> <h5>{file.vendedor}</h5>,
      },
      {
        title: 'Cliente',
        dataIndex: 'numctacte',
        key: 'numctacte',
        lupa:true,
        render:(state,file)=> <h5>{file.numctacte}</h5>  ,
      },
      {
        title: 'Razon Social',
        dataIndex: 'razonsoc',
        key: 'razonsoc',
        lupa:true,
        render:(state,file)=> <h5>{file.razonsoc}</h5>  ,
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
        render:(state,file)=> <h5>${numberWithCommas(file.importe)}</h5>,
      
      },
]
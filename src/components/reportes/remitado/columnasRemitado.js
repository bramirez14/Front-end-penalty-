import { numberWithCommas } from "../helpers/funciones";

export const columnasRdo=[
    {
        title: 'Vdor',
        dataIndex: 'vendedor',
        key: 'vendedor',
        width: 100
        
      },
      {
        title: 'Cliente',
        dataIndex: 'numctacte',
        key: 'numctacte',
        width: 100

        
      },
      {
        title: 'Razon Social',
        dataIndex: 'razonsoc',
        key: 'razonsoc',
        width: 140
      
      },
      {
        title: 'Unidades',
        dataIndex: 'unidades',
        key: 'unidades',
        width: 120

      
      },
      {
        title: 'Importe',
        dataIndex: 'importe',
        key: 'importe',
        width: 120,

        render:(state,file)=> <h5>${numberWithCommas(file.importe)}</h5>,
      
      },
]
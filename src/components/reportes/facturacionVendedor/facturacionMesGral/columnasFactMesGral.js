import { numberWithCommas } from "../../helpers/funciones";

export const columnasFactMes=[
    {
        title: 'Categoria',
        dataIndex: 'categoria',
        key: 'categoria',
        width:150,
        render:(state,file)=> <h5>{file.categoria}</h5>,
      },
      {
        title: 'Unidades',
        dataIndex: 'unidades',
        key: 'unidades',
        width:150,
        render:(state,file)=> <h5>{file.unidades}</h5>,

      },
      {
        title: 'Importe',
        dataIndex: 'importe',
        key: 'importe',
        width:150,
        render:(state,file)=> <h5>${numberWithCommas(file.importe)}</h5>,

      },
    
]
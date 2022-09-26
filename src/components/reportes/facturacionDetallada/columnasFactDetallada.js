import { numberWithCommas } from "../helpers/funciones";

export const columnasFactDet=[
    {
        title: 'Fecha',
        dataIndex: 'fecemision',
        key: 'fecemision',
        lupa:true,
        render:(state,file)=> {
        const fecha = file.fecemision.split('T')[0];
        return <h5>{fecha}</h5>
      }
        
      },
      {
        title: 'Codigo',
        dataIndex: 'codigo',
        key: 'codigo',
        lupa:true,
        render:(state,file)=> <h5>{file.codigo}</h5>,
        
      },
      {
        title: 'Comprobante',
        dataIndex: 'numeromov',
        key: 'numeromov',
        lupa:true,
        render:(state,file)=> <h5>{file.numeromov}</h5>,
        
      },
      {
        title: 'Cliente',
        dataIndex: 'numctacte',
        key: 'numctacte',
        lupa:true,
        render:(state,file)=> <h5>{file.numctacte}</h5>,
        
      },
      {
        title: 'Razon Social',
        dataIndex: 'razonsoc',
        key: 'razonsoc',
        with:150,
        lupa:true,
        render:(state,file)=> <h5>{file.razonsoc}</h5>,
        
      },
      {
        title: 'Vdor',
        dataIndex: 'vendedor',
        key: 'vendedor',
        lupa:true,
        render:(state,file)=> <h5>{file.vendedor}</h5>,
        
      },
      {
        title: 'Condicion',
        dataIndex: 'condventa',
        key: 'condventa',
        render:(state,file)=> <h5>{file.condventa}</h5>,
        
      },
      {
        title: 'Dto',
        dataIndex: 'bonifica',
        key: 'bonifica',
        lupa:true,
        render:(state,file)=> <h5>{file.bonifica}</h5>,
        
      },
      {
        title: 'Articulo',
        dataIndex: 'articulo',
        key: 'articulo',
        with:150,
        lupa:true,
        render:(state,file)=> <h5>{file.articulo}</h5>,
        
      },
      {
        title: 'Descripcion',
        dataIndex: 'descrip',
        key: 'descrip',
        render:(state,file)=> <h5>{file.decrip}</h5>,
        
      },
      {
        title: 'Unidades',
        dataIndex: 'unidades',
        key: 'unidades',
        render:(state,file)=> <h5>{file.unidades}</h5>,
        
      },
      {
        title: 'Precio',
        dataIndex: 'precio',
        key: 'precio',
        render:(state,file)=> <h5>${numberWithCommas(file.precio)}</h5>,
        
      },
      {
        title: 'Importe',
        dataIndex: 'importe',
        key: 'importe',
        render:(state,file)=> <h5>${numberWithCommas(file.importe)}</h5>,
        
      },
      {
        title: 'IVA',
        dataIndex: 'iva',
        key: 'iva',
        render:(state,file)=> <h5>${numberWithCommas(file.iva)}</h5>,
        
      },
      {
        title: 'Bonificacion',
        dataIndex: 'bonificacion',
        key: 'bonificacion',
        render:(state,file)=> <h5>{file.bonificacion}</h5>,
        
      },
      {
        title: 'Total',
        dataIndex: 'total',
        key: 'total',
        render:(state,file)=> <h5>${numberWithCommas(file.total)}</h5>,
        
      },
]
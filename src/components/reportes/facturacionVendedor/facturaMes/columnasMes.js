export const columnasMes=[
        {
          title: 'Vendedor',
          dataIndex: 'vendedor',
          key: 'vendedor',
          width: '20%',
          render:(state,file)=> <h5>{file.vendedor}</h5>,
        },
        {
          title: 'Cliente',
          dataIndex: 'numctacte',
          key: 'numctacte',
          width: '20%',
          render:(state,file)=> <h5>{file.numctacte}</h5>,
        },
        {
          title: 'Razon Social',
          dataIndex: 'razonsoc',
          key: 'razonsoc',
          render:(state,file)=> <h5>{file.razonsoc}</h5>,
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
          render:(state,file)=>{
            function numberWithCommas(x) { 
              const valorNumerico = parseFloat(x).toFixed(2)
              const valor= valorNumerico.replace('.', ',');
              return valor.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "."); }

            return <h5>${numberWithCommas(file.importe)}</h5>},
        },


]
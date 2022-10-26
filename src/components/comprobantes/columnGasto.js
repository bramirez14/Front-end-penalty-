export const columnGasto=[
    {
        title: 'N Rendicion',
        dataIndex: 'id',
        key: 'id',
        render: (text) => <p>#{text}</p>,
        
      },
    {
        title: 'Nombre',
        dataIndex: 'name',
        key: 'name',
        search:true
      },
      {
        title: 'Apellido',
        dataIndex: 'lastName',
        key: 'lastName',
      },
      {
        title: 'Fecha',
        dataIndex: 'fecha',
        key: 'fecha',
        search:true
      },
      {
        title: 'Importe',
        dataIndex: 'importe',
        key: 'importe',
        render: (text) => <p>${text}</p>,
      },
      {
        title: 'Estado',
        dataIndex: 'estadoFinal',
        key: 'estadoFinal',

      },
     

]
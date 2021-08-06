import { Button } from "antd";

export const columnasCtaCte=[
   
      {
        title: 'Cliente',
        dataIndex: 'cliente',
        key: 'cliente',
        width: '20%',
        
      },
      {
        title: 'Razon Social',
        dataIndex: 'razonsoc',
        key: 'razonsoc',
      
      },
      {
        title: 'Vendedor',
        dataIndex: 'vendedor',
        key: 'vendedor',
        width: '20%',
        
      },
      {
        title: 'Nombre',
        dataIndex: 'apeynom',
        key: 'apeynom',
      
      },
      {
        title: 'Fecha',
        dataIndex: 'fecemision',
        key: 'fecemision',
      },
      {
        title: 'Vto',
        dataIndex: 'fecvenc',
        key: 'fecvenc',
      }, 
      {
        title: 'Cabeza',
        dataIndex: 'cabeza',
        key: 'cabeza',
      },
      {
        title: 'Cod Cabeza',
        dataIndex: 'codcabeza',
        key: 'codcabeza',
      },
      {
        title: 'aplicado',
        dataIndex: 'aplicado',
        key: 'aplicado',
      },
      {
        title: 'codaplicado',
        dataIndex: 'codaplicad',
        key: 'codaplicad',
      },
      {
        title: 'Total',
        dataIndex: 'totalml',
        key: 'totalml',
      },
       {
        title: 'Saldo',
        dataIndex: 'saldoml',
        key: 'saldoml',
      },
      {
        title: 'pdf',
        dataIndex: 'pdf',
        key: 'pdf',
        render:(state,file)=> <Button type='link'> { file.pdf } </Button>
      },
      
      

]
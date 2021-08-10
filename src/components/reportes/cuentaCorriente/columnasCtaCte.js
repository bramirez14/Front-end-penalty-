import { Button } from "antd";

export const columnasCtaCte=[
   
      {
        title: 'Cliente',
        dataIndex: 'cliente',
        key: 'cliente',
        width:100,
        render:(state,file)=> <h5>{file.cliente}</h5>,
        
      },
      {
        title: 'Razon Social',
        dataIndex: 'razonsoc',
        key: 'razonsoc',
        width:170,
        render:(state,file)=> <h5>{file.razonsoc}</h5>,
      },
      {
        title: 'Vdor',
        dataIndex: 'vendedor',
        key: 'vendedor',
        width:100,

        render:(state,file)=> <h5>{file.vendedor}</h5>,
        
      },
      {
        title: 'Nombre',
        dataIndex: 'apeynom',
        key: 'apeynom',
        width:160,

        render:(state,file)=> <h5>{file.apeynom}</h5>,
      },
      {
        title: 'Fecha',
        dataIndex: 'fecemision',
        key: 'fecemision',
        width:140,
        render:(state,file)=>{
          const fecha = file.fecemision.split('T')[0];
         return <h5>{fecha}</h5>
        },
      },
      {
        title: 'Vto',
        dataIndex: 'fecvenc',
        key: 'fecvenc',
        width:120,
        render:(state,file)=> {
          const fecha = file.fecvenc.split('T')[0];
         return <h5>{fecha}</h5>
        },
      }, 
      {
        title: 'Cabeza',
        dataIndex: 'cabeza',
        key: 'cabeza',
        width:140,

        render:(state,file)=> <h5>{file.cabeza}</h5>,
      },
      {
        title: 'Cod Cabeza',
        dataIndex: 'codcabeza',
        key: 'codcabeza',
        width:100,

        render:(state,file)=> <h5>{file.codcabeza}</h5>,
      },
      {
        title: 'aplicado',
        dataIndex: 'aplicado',
        key: 'aplicado',
        width:140,

        render:(state,file)=> <h5>{file.aplicado}</h5>,
      },
      {
        title: 'codaplicado',
        dataIndex: 'codaplicad',
        key: 'codaplicad',
        width:140,

        render:(state,file)=> <h5>{file.codaplicad}</h5>,
      },
      {
        title: 'Total',
        dataIndex: 'totalml',
        key: 'totalml',
        width:100,

        render:(state,file)=> <h5>${file.totalml}</h5>,
      },
       {
        title: 'Saldo',
        dataIndex: 'saldoml',
        key: 'saldoml',
        width:100,

        render:(state,file)=> <h5>${file.saldoml}</h5>,
      },
      {
        title: 'pdf',
        dataIndex: 'pdf',
        key: 'pdf',
        width:120,

        render:(state,file)=> <h5>{file.pdf}</h5>//pendiente
      },
      
      

]
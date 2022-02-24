import React from 'react'
import { Table } from 'antd';
import { useSelector } from 'react-redux';
import { PdfoImg } from '../../helpers/PdfoImg';
export const TarjetaCreditoComp = () => {
    const dataSource= useSelector(state=>state.rendiciones.tc);
const columns=[
  {
    title:'N°',
    dataIndex:'id',
    key: 'id',
  },
  {
    title: 'Fecha',
    dataIndex: 'fecha',
    key: 'fecha',
    render:(state,file)=>{
      let day= file?.fecha
      let  d = new Date(day).getDate();
       let  m = new Date(day).getMonth();
        let y = new Date(day).getFullYear();
  return <span>{day !== null ?`${d}/${m}/${y}` :'no hay fecha'}</span>
  }
  },
    {
        title: 'Nombre',
        dataIndex: 'nombre',
        key: 'nombre',
      },
      {
        title: 'Apellido ',
        dataIndex: 'apellido',
        key: 'apellido',
      },
      {
        title: 'Importe ',
        dataIndex: 'importe',
        key: 'importe',
      },
      {
        title: 'Tarjeta ',
        dataIndex: 'tarjeta',
        key: 'tarjeta',
      },
      {
        title: 'Archivo',
        dataIndex: 'archivo',
        key: 'archivo',
        render:(state,file)=> <PdfoImg file={file.archivo}/>
      },
]
    return (
        <Table 
        title={() => <h2>Gastos de Tarjeta de Credito</h2>}
        dataSource={dataSource} columns={columns} />
    )
}

import React from 'react'
import { Table } from 'antd';
import { useSelector } from 'react-redux';
import { PdfoImg } from '../../helpers/PdfoImg';
export const TarjetaCreditoComp = () => {
    const dataSource= useSelector(state=>state.peticiones_GET.tarjeta_credito);
const columns=[
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
        <Table dataSource={dataSource} columns={columns} />
    )
}

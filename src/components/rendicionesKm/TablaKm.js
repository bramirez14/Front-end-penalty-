import React,{useState} from 'react'
import { Table,Button } from 'antd';
import { axiosURL } from '../../config/axiosURL';

export const TablaKm = ({datos,borrar,setState,state}) => {

    const columns = [
        {
          title: 'Fecha',
          dataIndex: 'fechaSelect',
        },
        {
          title: 'KM INICIAL',
          dataIndex: 'KmI',
          render:(state,file) => <span>{file.KmI} Km</span>

        },
        {
          title: 'KM FINAL',
          dataIndex: 'kmF',
          render:(state,file) => <span>{file.KmF} Km</span>
        },
        {
          title: 'KM RECORRIDOS',
          dataIndex: 'kmRecorridos',
          render:(state,file) => <span style={{marginLeft:'20px'}}>{file.KmRecorrido} Km</span>
        },
        {
          title: 'TOTAL',
          dataIndex: 'importe',
          render:(state,file) => <span>${file.importe}</span>
        },
        {
          title: 'NOTAS',
          dataIndex: 'nota',
          render:(state,file) => <span>{file.nota}</span>
        },
        {
          title: '',
          dataIndex: 'acciones',
          render:(state,file) =>( <Button onClick={()=>borrar(file.id)}>Borrar</Button>)
        }
    ]
      const data= datos.map(m=> {
        return{
        ...m,
        key: m.id,
       
      }
    })
    return (
      <Table
        style={{margin:'auto'}}
        columns={columns}
        dataSource={data}
        pagination={false}
      />
    )
}

import React from 'react'
import { Table, Tag, Space } from 'antd';
import { PeticionGET } from '../config/PeticionGET';

export const AntPagos = () => {
    const antGasto=PeticionGET('/gastos');
    const  antSueldo = PeticionGET('/anticipo');
    console.log(antGasto);
    const data=[...antSueldo,...antGasto]
    const dataFiltradaAprobado=data.filter(d=>d.estadoFinal==='aprobado')
    console.log(dataFiltradaAprobado);
    const columns = [
        {
          title: 'N de Anticipo',
          dataIndex: 'name',
          key: 'name',
          render: text => <a>{text}</a>,
        },
        {
          title: 'Age',
          dataIndex: 'age',
          key: 'age',
        },
        {
          title: 'Address',
          dataIndex: 'address',
          key: 'address',
        },
        {
          title: 'Tags',
          key: 'tags',
          dataIndex: 'tags',
          
        },
        {
          title: 'Action',
          key: 'action',
          render: (text, record) => (
            <Space size="middle">
              <a>Invite {record.name}</a>
              <a>Delete</a>
            </Space>
          ),
        },
      ];
    return (
        <Table columns={columns} dataSource={data} />
    )
}

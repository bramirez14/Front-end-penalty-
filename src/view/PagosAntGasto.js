import React from 'react'
import { Table, Space,Button } from 'antd';
import { PeticionGET } from '../config/PeticionGET';

export const PagosAntGasto = () => {
    const  antGasto = PeticionGET('/gastos');
    
    const columns = [
        {
          title: 'N de Ant Gasto',
          dataIndex: 'id',
          key: 'id',
          width:'80px',
        },
        {
          title: 'Fecha',
          dataIndex: 'fecha',
          key: 'fecha',
        },
      
        {
          title: 'Importe',
          key: 'importe',
          dataIndex: 'importe',
          render:(state,file)=>(<p>${file.importe}</p>)
        },
        {
          title: 'Estado',
          dataIndex: 'estadoFinal',
          key: 'estadoFinal',
        },
        {
          title: 'Acciones',
          key: 'acciones',
          render: (text, record) => (
            <Space size="middle">
              <Button>Pago Realizado</Button>
            </Space>
          ),
        },
      ];
    return (
        <Table columns={columns} dataSource={antGasto} pagination={false} bordered={true}/>
    )
}

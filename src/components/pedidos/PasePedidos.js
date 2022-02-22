import { Table } from 'antd';
import { useState,useEffect } from 'react';
import { axiosURL } from '../../config/axiosURL';
const columns = [
  {
    title: 'Vendedor',
    dataIndex: 'VENDEDOR',
    filters: [
      {
        text: 'Joe',
        value: 'Joe',
      },
      {
        text: 'Jim',
        value: 'Jim',
      },
      
    ],
    // specify the condition of filtering result
    // here is that finding the name started with `value`
    onFilter: (value, record) => record.name.indexOf(value) === 0,
    /* sorter: (a, b) => a.name.length - b.name.length,
    sortDirections: ['descend'], */
  },
  {
    title: 'Age',
    dataIndex: 'age',
    defaultSortOrder: 'descend',
    sorter: (a, b) => a.age - b.age,
  },
  {
    title: 'Address',
    dataIndex: 'address',
    filters: [
      {
        text: 'London',
        value: 'London',
      },
      {
        text: 'New York',
        value: 'New York',
      },
    ],
    onFilter: (value, record) => record.address.indexOf(value) === 0,
  },
];
const data = [
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
    },
    {
      key: '4',
      name: 'Jim Red',
      age: 32,
      address: 'London No. 2 Lake Park',
    },
  ];


export const PasePedidos = () =>{

    
    const [state, setState] = useState([]);
const GET_aprobPedidos = async()=>{
 let response = await axiosURL.get('/pedidos/pase-pedidos')
 setState(response.data);
}
useEffect(() => {
  GET_aprobPedidos();
}, [])
console.log(state);
const vendedores = state.map( s => ({
    text: s.VENDEDOR,
    value: s.VENDEDOR,
}))
console.log(vendedores);

    function onChange(pagination, filters, sorter, extra) {
        console.log('params', pagination, filters, sorter, extra);
    }
    const columns = [
        {
          title: 'Vendedor',
          dataIndex: 'VENDEDOR',
          filters: [
           ,
            {
              text: '080',
              value: '080',
            },
            
          ],
        
          onFilter: (value, record) => record.VENDEDOR.indexOf(value) === 0,
          
          
        },
        {
          title: 'Age',
          dataIndex: 'age',
          defaultSortOrder: 'descend',
          sorter: (a, b) => a.age - b.age,
        },
        {
          title: 'Address',
          dataIndex: 'address',
          filters: [
            {
              text: 'London',
              value: 'London',
            },
            {
              text: 'New York',
              value: 'New York',
            },
          ],
          onFilter: (value, record) => record.address.indexOf(value) === 0,
        },
      ];
    return <Table columns={columns} dataSource={data} onChange={onChange} />
}

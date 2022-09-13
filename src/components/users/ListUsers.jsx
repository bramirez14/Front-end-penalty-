import { ArrowRightOutlined } from '@ant-design/icons';
import { Avatar, Divider, List, Skeleton } from 'antd';
import  { useEffect, useState } from 'react';
import { useGet } from '../../hooks/useGet';
import { Link } from "react-router-dom";

export const ListUsers = () => {
    const [listUsers]= useGet('/allusers')
    console.log(listUsers);
  return (
    <List
    className='form-complete'
    style={{width:'auto'}}
    dataSource={listUsers}
    renderItem={(item) => (
        
      <List.Item key={item.id}
      actions={[<a key="list-loadmore-edit">edit</a>, <a key="list-loadmore-more">Eliminar</a>]}
      >
         <List.Item.Meta
          avatar={<Avatar src={item.imagen} />}
          title={<a href="https://ant.design">{item.nombre}</a>}
          description={item.email}
        /> 
        <Link to={`/usuario/${item.id}`}><ArrowRightOutlined /></Link>
      </List.Item>
    )}
  />
  )
}

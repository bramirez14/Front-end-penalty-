import React from 'react'
import { useGet } from '../../hooks/useGet'
import { Card, List, Avatar, Button, Menu,Dropdown,message } from 'antd';
import { EllipsisOutlined, UserOutlined } from '@ant-design/icons';
import { FaBullhorn  } from "react-icons/fa";
import './alerta.css'

function handleMenuClick(e) {
  message.info('Click on menu item.');
  console.log('click', e);
}
const menu = (
  <Menu onClick={handleMenuClick}>
    <Menu.Item key="1" icon={<UserOutlined />}>
      1st menu item
    </Menu.Item>
    <Menu.Item key="2" icon={<UserOutlined />}>
      2nd menu item
    </Menu.Item>
    <Menu.Item key="3" icon={<UserOutlined />}>
      3rd menu item
    </Menu.Item>
  </Menu>
);

export const Alerta = () => {
  const [alertas,nuevasAlertas]= useGet('/msg/alertas');
  console.log(alertas);
  return (
    <Card title='Notificaciones' className='contenedor-alerta' style={{width:500}}>
  <List
    itemLayout="vertical"
    size="small"
    /* loading={true} */
 
    dataSource={alertas}
    FaBullhorn
    renderItem={item => (
      <List.Item
        key={item.title}
        extra={
          <Dropdown overlay={menu}>
          <Button  shape="circle" icon={<EllipsisOutlined  style={{fontSize:28}} />} size='large' className='boton-alerta'  />
          </Dropdown>
        }
      >
        <List.Item.Meta
          avatar={<Avatar src={item.usuario.imagen} style={{ fontSize:20,color:'#46a461'}} />}
          title={<a href={item.href}>{item.info}</a>}
          description={`De: ${item.nombre}`}
        />
        {item.alerta} 
      </List.Item>
    )}
  />


    </Card>
    
  )
}

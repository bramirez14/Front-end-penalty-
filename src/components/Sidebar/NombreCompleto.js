import React from 'react'
import { Menu, Dropdown, Button, message, Space, Tooltip } from 'antd';
import { DownOutlined, UserOutlined } from '@ant-design/icons';
import { CaretDownOutlined } from "@ant-design/icons";
import { ImExit } from "react-icons/im";
import {Link} from 'react-router-dom'
import './css/drop.css'
export const NombreCompleto = ({handleLogout,nombre,apellido,history}) => {
      
      const menu = (
        <Menu >
          <Menu.Item key="1" icon={<ImExit/>} style={{fontSize:'20px'}}onClick={handleLogout}>
           Salir
          </Menu.Item>
          <Menu.Item key="2" icon={<UserOutlined style={{fontSize:17}}/>} style={{fontSize:'20px'}}>
          <Link to='/estado/usuario'>Estado del Usuario</Link> 
          </Menu.Item>
          {/* <Menu.Item key="3" icon={<UserOutlined />}>
            3rd menu item
          </Menu.Item> */}
        </Menu>
      );
    return (
        <Space wrap>
    
   
    <Dropdown overlay={menu} className='drop'>
      <a>
      {nombre} {apellido} <CaretDownOutlined /> 
      </a>
    </Dropdown>
  </Space>
    )
}

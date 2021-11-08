import React from 'react'
import { Menu} from "antd";
import { DownOutlined } from '@ant-design/icons';
import { Link } from "react-router-dom";


export const menuEmail= () =>{
  const N = localStorage.getItem('N')
console.log(N);

  
    return (
    <Menu>
       { N=== '901' || N==='902' || N ==='903' ?
      <Menu.Item>
        <Link to='/calendario'
        >
         Calendario
        </Link>
      </Menu.Item>:''}
      <Menu.Item  disabled>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.aliyun.com"
        >
         muy pronto
        </a>
      </Menu.Item>
      <Menu.Item disabled>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.luohanacademy.com"
        >
          muy pronto
        </a>
      </Menu.Item>
      <Menu.Item danger>Eliminar Cuenta</Menu.Item>
    </Menu>)
};
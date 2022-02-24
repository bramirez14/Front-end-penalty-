import React from 'react'
import { Menu} from "antd";



export const menuEmail= () =>{
  const N = localStorage.getItem('N')
console.log(N);

  
    return (
    <Menu>
     
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
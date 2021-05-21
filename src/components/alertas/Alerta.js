import React from 'react'
import { Badge,Menu, Dropdown, Button, Space  } from 'antd';
import { FaBell } from "react-icons/fa";
import './alerta.css'
import PeticionGET from '../../config/PeticionGET';
export const Alerta = () => {
  /* alerta de anticipo */
 const id = localStorage.getItem('uid')
 const {anticipo} = PeticionGET(`/${id}`)
 const filtroAprobado = anticipo?.filter(a=> a.estado==='aprobado')
 console.log(filtroAprobado);
  const menu = (
    
    <Menu style={{width:'220%',height:'auto'}}>
      {filtroAprobado?.map(l=>
        <Menu.Item>
        <a >
         tu solicitud de anticipo fue {l.estado}: {l.respMensaje}
        </a>
      </Menu.Item>
        
        )}
    
     
    </Menu>
  );
    return (
        <>
       
  
  <Space direction="vertical" >
    <Space wrap>
      
      <Dropdown overlay={menu} placement="bottomCenter" > 
        <Button style={{backgroundColor:'transparent',border:'none'}}>     
    <Badge count={parseInt(filtroAprobado?.length)} >
      <span className="head-example" />
      <FaBell className='icon-campana'/>
    </Badge>
</Button>
      </Dropdown>
      
    </Space>
  </Space>
  
        </>
    )
}




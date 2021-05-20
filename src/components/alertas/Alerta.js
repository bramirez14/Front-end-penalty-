import React from 'react'
import { Badge } from 'antd';
import { FaBell } from "react-icons/fa";
import './alerta.css'
export const Alerta = () => {
    return (
        <>
       
       <a href="#">
    <Badge count={5}>
      <span className="head-example" />
      <FaBell className='icon-campana'/>
    </Badge>
  </a>
  
        </>
    )
}




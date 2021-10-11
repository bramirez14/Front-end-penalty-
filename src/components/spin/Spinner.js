import { Spin } from 'antd';
 import React from 'react'
 import '../css/spin.css'
 export const Spinner = () => {
   return (
        <Spin tip={<h3 className='spinner'>Cargando...</h3>} spinning={true}  size='large' >
   
  </Spin>
   )
 }
 

 

import React from 'react'
import { Spin } from 'antd';
 import { LoadingOutlined } from '@ant-design/icons';
 import '../css/spin.css'
 export const Spinner = () => {
  const antIcon = <LoadingOutlined style={{ fontSize: 40,color:'#46a461' }} spin />

   return (
    <div className="example" style={{textAlign:'center',marginTop:240}} >
    <Spin  indicator={antIcon} tip={<h2 style={{color:'#46a461'}}>Wait...</h2>} />
  </div>
   )
 }

 

 

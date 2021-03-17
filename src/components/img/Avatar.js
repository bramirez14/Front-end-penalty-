import React from 'react'
import './avatar.css'
import { TiUserAdd } from "react-icons/ti";
export const Avatar = ({sidebar}) => {
    return (
        <div className='div-img' style={{border:'solid 1px' ,background:'white'}}>
      
        <input type="file" id='img'/>
        <label className='label-img' htmlFor='img'>
            <TiUserAdd className='avatar' />
            
            </label>  
         
        </div>
        
     
      
    )
}

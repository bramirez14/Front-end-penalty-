import React from 'react'
import './avatar.css'
import { TiUserAdd } from "react-icons/ti";
import { PeticionJWT } from '../../auth/PeticionJWT';
export const Avatar = ({sidebar}) => {
    const peticion= PeticionJWT();
    const {nombre,apellido} = peticion;
    return (
        <>
        <div className='div-img' style={{background:'white'}}>
      
        <input type="file" id='img'/>
        <label className='label-img' htmlFor='img'>
            <TiUserAdd className='avatar' />
            
            </label>  
        
        </div>
        <div className='persona'> <span className='personaje'>{ nombre } { apellido }</span></div>
 
        </>
     
      
    )
}

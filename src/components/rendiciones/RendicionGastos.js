import React from 'react'
import { Encabezado } from './Encabezado'
import { CreateRendicion } from './CreateRendicion';
//import './css/rendicionGastos.css'
import { Titulo } from '../titulos/Titulo';


export const RendicionGastos = ({history}) => {
  
    return (
        < >
        <div className='contenedor' >
          
        <Encabezado className='item-a'/> 
        
        <CreateRendicion history={history} className='item-b'/>
       
        </div>
        
      
        </>
    )
}

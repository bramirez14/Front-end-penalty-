import React from 'react'
import { Encabezado } from './Encabezado'
import { Crud } from './Crud';
import { CreateRendicion } from './CreateRendicion';
import './css/rendicionGastos.css'
import { FormularioRendicion } from './FormularioRendicion';
import { Titulo } from '../titulos/Titulo';
import { Form } from '../formularios/Form';


export const RendicionGastos = ({history}) => {
  
    return (
        < >
        <div className='contenedor' >
          
        <Encabezado className='item-a'/> 
        <Titulo titulo={'Nueva Rendicion'}/>
        <CreateRendicion history={history} className='item-b'/>
       
        </div>
        <Form/>
      
        </>
    )
}

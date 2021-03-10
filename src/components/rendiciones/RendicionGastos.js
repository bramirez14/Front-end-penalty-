import React from 'react'
import { Encabezado } from './Encabezado'
import { Crud } from './Crud';
import { CreateRendicion } from './CreateRendicion';
import './css/rendicionGastos.css'
import { FormularioRendicion } from './FormularioRendicion';

export const RendicionGastos = ({history}) => {
  
    return (
        < >
        <div className='contenedor' >
        <Encabezado className='item-a'/> 
        <h5>Nueva Rendicion</h5>
        <CreateRendicion history={history} className='item-b'/>
        </div>
        
      {/*  
      <CreateRendicion/>*/}

 {/** <Form.Group as={Row}>
    <Col sm={{ span: 10, offset: 2 }}>
      <Button type="submit">Sign in</Button>
    </Col>
  </Form.Group>
 */}
        </>
    )
}

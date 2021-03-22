import React from 'react'
import { Container, Form,Row,Col,Button } from "react-bootstrap";
//import { Input } from '../formularios/Input';
import './css/formularioRendicion.css'
export const FormularioRendicion = () => {
    return (
        <Container className='container' >

  <div className='form'>
<label>Departamento:</label>
<Input/>
<label>Responsable:</label>

<Input/>
<label>Desccripcion:</label>

<Input/>
</div>
</Container>
    )
}

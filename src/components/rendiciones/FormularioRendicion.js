import React from 'react'
import { Container, Form,Row,Col,Button } from "react-bootstrap";

export const FormularioRendicion = () => {
    return (
        <Container className='container' >
           
            <Form className='form'>
  <Form.Group as={Row} controlId="formHorizontalEmail">
    <Form.Label column sm={2}>
      Departamento:
    </Form.Label>
    <Col sm={10}>
      <Form.Control className='input'  type="text" placeholder='Ej:Sistemas...' />
    </Col>
  </Form.Group>

  <Form.Group as={Row} >
    <Form.Label column sm={2}>
      Responsable:
    </Form.Label>
    <Col sm={10}>
      <Form.Control className='input' type="text" placeholder='Ej:Esteban/Cristian...' />
    </Col>
  </Form.Group>
  <Form.Group as={Row} >
    <Form.Label column sm={2}>
     Observaciones:
    </Form.Label>
    <Col sm={10}>
      <Form.Control className='input'  type="text" placeholder="Ej: Se compro un disco SSD..." />
    </Col>
  </Form.Group>

  </Form>

</Container>
    )
}

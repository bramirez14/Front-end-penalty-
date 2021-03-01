import React from 'react'
import { Encabezado } from './Encabezado'
import { Container, Form,Row,Col,Button } from "react-bootstrap";
import { Crud } from './Crud';

export const RendicionGastos = () => {
    return (
        <>
        <Container>
            <Encabezado/>
            <Form>
  <Form.Group as={Row} controlId="formHorizontalEmail">
    <Form.Label column sm={2}>
      Departamento:
    </Form.Label>
    <Col sm={10}>
      <Form.Control type="text" placeholder='Ej:Sistemas...' />
    </Col>
  </Form.Group>

  <Form.Group as={Row} >
    <Form.Label column sm={2}>
      Responsable:
    </Form.Label>
    <Col sm={10}>
      <Form.Control type="text" placeholder='Ej:Esteban/Cristian...' />
    </Col>
  </Form.Group>
  <Form.Group as={Row} >
    <Form.Label column sm={2}>
     Observaciones:
    </Form.Label>
    <Col sm={10}>
      <Form.Control type="text" placeholder="Ej: Se compro un disco SSD..." />
    </Col>
  </Form.Group>


  <Crud/>

  <Form.Group as={Row}>
    <Col sm={{ span: 10, offset: 2 }}>
      <Button type="submit">Sign in</Button>
    </Col>
  </Form.Group>
</Form>

</Container>
        </>
    )
}

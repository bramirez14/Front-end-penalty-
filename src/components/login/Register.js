import React from 'react'
import { Form, Button, Container} from 'react-bootstrap'
export const Register = () => {
    return (
        <>
        <Container >
          <Form >
  <Form.Group >
  
    <Form.Control type="text" placeholder="Usuario" />
    
</Form.Group>

  <Form.Group>
    <Form.Control type="text" placeholder="Nombre" />
  </Form.Group>
  
  <Form.Group >
   <Form.Control type="email" placeholder="email" />
  </Form.Group>

  <Form.Group >
   <Form.Control type="password" placeholder="Contraseña" />
  </Form.Group>

  <Form.Group >
   <Form.Control type="password" placeholder="Repita la Contraseña" />
  </Form.Group>

 
  <Button variant="primary" type="submit">
    Entrar
  </Button>
</Form>  
</Container>
       </>
    )
}

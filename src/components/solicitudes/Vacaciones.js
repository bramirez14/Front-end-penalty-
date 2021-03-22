import React from 'react'
import { BotonSubmit } from '../botones/BotonSubmit'
import { InputMsg } from '../formularios/InputMsg'
import { Form, Col, Row, FormControl } from 'react-bootstrap';
import { Select } from '../inputs/Select'

import './sueldo.css'
export const Vacaciones = () => {
    return (
      <>
     <form className='form' >
        <h3 className='titulo'>Solicitud de Vacaciones</h3>

        <Form.Group>
          <Select titulo='Empleado' />
        </Form.Group>
        <Form.Row>
          <Form.Group as={Col} >
            <Form.Control type="text" placeholder="Importe" />
          </Form.Group>

          <Form.Group as={Col} >
            <Select titulo='Cuotas' />
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group as={Col} >
            <Select titulo='Sueldo' />

          </Form.Group>

          <Form.Group as={Col} >
            <Form.Control type="text" placeholder="" />
          </Form.Group>
        </Form.Row>
        <InputMsg width='500px' />
        <BotonSubmit />

      </form>
      </>
    )
}

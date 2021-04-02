import React from 'react'
import  {Form} from 'react-bootstrap';
import './select.css'
export const Select = ({titulo,array,change,name,click}) => {
    return (
        <Form.Control xs={7} as='select'  name={name} onChange={change} defaultValue={titulo} required>
          
      <option>{titulo}</option>
      { 
         array?.map((list) => (
           <option 
             className="opciones"
             key={list.id}
            value={list.id}
           >
             {list.nombre}
           </option>
         ))   }
        </Form.Control>
    )
}

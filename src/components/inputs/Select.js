import React from 'react'
import  {Form} from 'react-bootstrap';
import './select.css'
export const Select = ({titulo,array,change,name}) => {
  console.log(array)
    return (
      
        <Form.Control xs={7} as='select'  name={name} onChange={change} defaultValue={titulo}>
          
      <option  >{titulo}</option>
      { 
         array?.map((list) => (
           <option
             id="opciones"
             key={list.id}
            value={list.id}
            

           >
             {list.nombre}
           </option
           
           >
         ))   }
        </Form.Control>
    )
}

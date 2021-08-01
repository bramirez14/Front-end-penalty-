import React from 'react'
import { Form, Input} from "antd";
import { SelectAnt } from '../../inputs/SelectAnt';

export const FormAntSueldo = ({handleChange,data,handleChangeCuotas,mes}) => {
    return (
      <>
        <Form.Item
                name="importe"
                rules={[
                  {
                    required: true,
                    message: "ingrese un importe",
                  },
                ]}
              >
                <Input
                  type="number"
                  placeholder="Importe"
                  name="importe"
                  onChange={handleChange}
                />
     </Form.Item>
             
               <SelectAnt
               placeholder="Cuotas"
               name="cuotas"
               array={data}
               mensaje="seleccione una opcion"
               change={handleChangeCuotas}
             />
                
       </>
       
    )
}

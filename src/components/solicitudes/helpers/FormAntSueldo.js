import React from 'react'
import { Form, Input} from "antd";
import { SelectAnt } from '../../inputs/SelectAnt';

export const FormAntSueldo = ({data,}) => {
    return (
      <>
        <Form.Item
                name="importe"
                hasFeedback
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
                />
      </Form.Item>
               <SelectAnt
               placeholder="Cuotas"
               name="cuotas"
               array={data}
               mensaje="seleccione una opcion"
             />
                
       </>
       
    )
}

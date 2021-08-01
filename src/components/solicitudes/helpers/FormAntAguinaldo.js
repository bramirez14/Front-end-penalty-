import React from 'react'
import { Form, Input, Select,Radio} from "antd";

export const FormAntAguinaldo = ({handleChange,mes,handleChangeCuotas}) => {
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

            {   mes > 0 && mes <= 5 ? (
                <Form.Item>
                  <Input name="cuotas" value="1" disabled placeholder='Cuotas' />
                </Form.Item>
              ) : (
                <Form.Item name="cuotas" >
                <Radio.Group name="cuotas" onChange={handleChangeCuotas} value={'1'}>
                <Radio value={'1'}>1 Cuota</Radio>
                <Radio value={'2'}>2 Cuotas</Radio>
              </Radio.Group>
              </Form.Item>
              )}

        </>
    )
}

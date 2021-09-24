import React from 'react'
import { Form, Input,Radio} from "antd";

export const FormAntAguinaldo = ({mes}) => {
    return (
        <>
            <Form.Item
              hasFeedback
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
                />
              </Form.Item>

            {   mes > 0 && mes <= 5 ? (
                <Form.Item name="cuotas" >
                  <Input value="1" disabled placeholder='Cuotas' />
                </Form.Item>
              ) : (
                <Form.Item name="cuotas"  rules={[
                  {
                    required: true,
                    message: "seleccione una cuota",
                  },
                ]}>
                <Radio.Group >
                <Radio value='1'>1 Cuota</Radio>
                <Radio value='2'>2 Cuotas</Radio>
              </Radio.Group>
              </Form.Item>
              )}

        </>
    )
}

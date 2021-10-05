import React from 'react'
import {Button, Form} from 'antd'
import { Files } from '../../helpers/Files'
export const TarjetaCredito = () => {
     const onFinish = (values) => {
    console.log('Success:', values);
  };
    return (
        <Form
        name="validate_other"
        onFinish={onFinish}
        >
            <Files/>
            <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Button type="primary" htmlType="submit">
          Guardar
        </Button>
      </Form.Item>
        </Form>
    )
}

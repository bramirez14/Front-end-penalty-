import React, { useState } from 'react';
import { Form, Input, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete } from 'antd';
const { Option } = Select;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 8 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

export const Register = () => {
  const [form] = Form.useForm();
  const onFinish = (values) => {
    console.log('Received values of form: ', values);
  };

  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select
        style={{
          width: 70
        }}
        defaultValue='11'
  >
      </Select>
    </Form.Item>
  );

  return (
    <Form
      {...layout}
      form={form}
      name="register"
      onFinish={onFinish}
      initialValues={{
        prefix: '11',
      }}
      scrollToFirstError
      style={{marginTop:'70px'}}
    >
      <Form.Item
        name="nombre"
        label="Nombre"
        rules={[
          {
            required: true,
            message: 'Ingrese un nombre!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="apellido"
        label="Apellido"
        rules={[
          {
            required: true,
            message: 'Ingresa un Apellido!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="email"
        label="E-mail"
        rules={[
          {
            type: 'email',
            message: 'No es un E-mail valido!',
          },
          {
            required: true,
            message: 'Ingrese un  E-mail!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="password"
        label="Contraseña"
        rules={[
          {
            required: true,
            message: 'Ingrese una Contrasena!',
          },
        ]}
        hasFeedback
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="password2"
        label="Confirme Contraseña"
        dependencies={['password']}
        hasFeedback
        rules={[
          {
            required: true,
            message: 'Please confirm your password!',
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }

              return Promise.reject(new Error('The two passwords that you entered do not match!'));
            },
          }),
        ]}
      >
        <Input.Password />
      </Form.Item>
     
      <Form.Item
        name="cel"
        label="Celular"
        rules={[
          {
            required: true,
            message: 'Please input your phone number!',
          },
        ]}
      >
        <Input
          addonBefore={prefixSelector}
          style={{
            width: '100%',
          }}
        />
      </Form.Item>

      <Form.Item
        name="tipousuario"
        label="Usuario"
        rules={[
          {
            required: true,
            message: 'Ingrese un usuario!',
          },
        ]}
      >
        <Input/>
      </Form.Item>
      
      <Form.Item
        name="categoria"
        label="Categoria"
        rules={[
          {
            required: true,
            message: 'Ingrese una categoria!',
          },
        ]}
      >
        <Input/>
      </Form.Item>

      <Form.Item
        name="nvendedor"
        label="Vendedor"
        rules={[
          {type:'number'},
          {
            required: true,
            message: 'Ingrese un numero de vendedor!',
          },
        ]}
      >
        <Input/>
      </Form.Item>

      <Form.Item
        name="fechaContratacion"
        label="Fecha de Contratacion"
        rules={[
          {
            required: true,
            message: 'Ingrese una fecha de contratacion!',
          },
        ]}
      >
        <Input/>
      </Form.Item>



      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          Register
        </Button>
      </Form.Item>
    </Form>
  );
};

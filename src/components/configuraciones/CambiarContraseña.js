import React from 'react'
import { Form, Input, Button, Checkbox } from 'antd';
import { axiosURL } from '../../config/axiosURL';
import { logout } from '../../auth/localStorage';

export const CambiarContraseña = ({history}) => {
    const id = localStorage.getItem('uid')

    const onFinish = async (values) => {
       const {data} = await axiosURL.put('/cambiar/contrasena',{...values,id});
       if( data==='ok' ){
           logout();
           history.push("/login");}
    };
    
      const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
      };
     
    return (
        <Form
        style={{marginTop:'20px'}}
        name="Cambiar Contrasena"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 6,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
        name="password"
        label="Cambiar Contraseña"
        rules={[
          {
            required: true,
            message: "Ingrese una Contrasena!",
          },
        ]}
        hasFeedback
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="password2"
        label="Confirme Contraseña"
        dependencies={["password"]}
        hasFeedback
        rules={[
          {
            required: true,
            message: "Please confirm your password!",
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue("password") === value) {
                return Promise.resolve();
              }

              return Promise.reject(
                new Error("The two passwords that you entered do not match!")
              );
            },
          }),
        ]}
      >
        <Input.Password />
      </Form.Item>
  
        
  
        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit">
            Enviar
          </Button>
        </Form.Item>
      </Form>
    )
}

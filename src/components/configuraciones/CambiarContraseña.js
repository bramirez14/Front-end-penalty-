import React from 'react'
import { Form, Input, Button } from 'antd';
import { axiosURL } from '../../config/axiosURL';
import { logout } from '../../auth/localStorage';
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'

export const CambiarContraseña = () => {
    const id = localStorage.getItem('uid')
const navigate= useNavigate();
    const onFinish = async (values) => {
       const result= await axiosURL.put('/cambiar/contrasena',{...values,id});
       if( result.data.status === 200 ){
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'La contraseña se guardo con exito!!!',
          showConfirmButton: false,
          timer: 1500
        })
        logout();

      navigate("/login");}
    };
    
      const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
      };
     
    return (
      <div className='cambiopassword' >

        <Form
        style={{marginTop:'20px'}}
        name="Cambiar Contrasena"
        labelCol={{
          span: 12,
        }}
        wrapperCol={{
          span: 8,
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
      </div>
    )
}

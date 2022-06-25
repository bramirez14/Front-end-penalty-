import React, { useState } from "react";
import {
  Form,
  Input,
  Select,
  Button,
  DatePicker,
  Row,
  Col,
  Divider,
} from "antd";
import {PeticionGET} from "../../config/PeticionGET";
import {axiosURL} from "../../config/axiosURL";
import { Titulo } from "../titulos/Titulo";
import { useNavigate } from "react-router";
const { Option } = Select;


const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

export const Register = ( ) => {
  const [fecha, setFecha] = useState('')
  const tipo = localStorage.getItem('type')
  const navigate=useNavigate();
  const onFinish = async (values) => {
    let cel= '11'.concat(values.cel)
    let valor = { ...values,fechaContratacion:fecha,cel}
    let res = await axiosURL.post('/register',valor);
    res.data.status===500 ? alert (res.data.message ) : navigate('/perfil')
    
  };

  const onChange = (date, dateString) => {
    setFecha(dateString)
  }
 
  const dtos = PeticionGET('/departamentos')
  
  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select
        style={{
          width: 70,
        }}
        defaultValue="11"
      ></Select>
    </Form.Item>
  );
  return (
    <>
   <Form
      className='container-form'
      name="register"
      onFinish={onFinish}
      initialValues={{
        prefix: "11",
      }}
      style={{width:400,borderRadius:10,padding:20}}
      
      >
        <Titulo  titulo="Registro de Empleados" />
          <Divider/>
     
      <Row gutter={10} style={{width:300,margin:'auto'}}>
        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
      <Form.Item
        name="departamentoId"
        hasFeedback
        rules={[
          {
            required: true,
            message: "Seleccione un dto!",
          },
        ]}
      >
       <Select placeholder='Departamento'>
       {dtos.map( d=>
          <Option value={d.id} key={d.id} >
            {d.departamento}
          </Option>
      )}
        </Select>
      </Form.Item>

      <Form.Item
        name="nombre"
        rules={[
          {
            required: true,
            message: "Ingrese un nombre!",
          },
        ]}
      >
       
        <Input  placeholder="Nombre" />
      </Form.Item>

      <Form.Item
        name="apellido"
        hasFeedback
        rules={[
          {
            required: true,
            message: "Ingresa un Apellido!",
          },
        ]}
      >
        <Input placeholder="Apellido" />
      </Form.Item>

      <Form.Item
        name="email"
        hasFeedback
        rules={[
          {
            type: "email",
            message: "No es un E-mail valido!",
          },
          {
            required: true,
            message: "Ingrese un  E-mail!",
          },
        ]}
      >
        <Input  placeholder="E-mail"/>
      </Form.Item>

      <Form.Item
        name="password"
       placeholder="Contraseña"
        rules={[
          {
            required: true,
            message: "Ingrese una Contrasena!",
          },
        ]}
        hasFeedback
      >
        <Input.Password  placeholder="Contraseña"/>
      </Form.Item>

      <Form.Item
        name="password2"
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
        <Input.Password placeholder="Confirme Contraseña"/>
      </Form.Item>

      <Form.Item
        name="cel"
        rules={[
          {
            required: true,
            message: "Please input your phone number!",
          },
        ]}
        hasFeedback
      >
        <Input
        placeholder="Celular"
          addonBefore={prefixSelector}
          style={{
            width: "100%",
          }}
        />
      </Form.Item>

          <Form.Item name='tipousuario'  rules={ [{required:true,message:' Seleccione una opcion!'}]}  hasFeedback>
          <Select placeholder='Tipo de usuario'>
          <Option value='Gerente'>
          Gerente
          </Option>
          <Option value='Empleada'>
            Empleada
          </Option>
          <Option value='Empleado'>
            Empleado
          </Option>
          <Option>
            Visitante
          </Option>
          </Select>
          </Form.Item>
    
      <Form.Item
        name="categoria"
        rules={[
          {
            required: true,
            message: "Ingrese una categoria!",
          },
        ]}
        hasFeedback
      >
        <Select placeholder="Categoria">
          <Option value='interno'>
            Interno
          </Option>
          <Option value='externo'>Externo</Option>
          </Select>
      </Form.Item>

      <Form.Item name='nvendedor' 
      tooltip={{ title: 'Si no es un vendedor ingresar 0000' }}
      rules={[{
          required: true,
          message: "Ingrese numero de vendedor!",
      }]}
      hasFeedback>
        <Input type='number' placeholder=' Vendedor'/>
      </Form.Item>

      <Form.Item
        name="fechaContratacion"
        rules={[
          {
            required: true,
            message: "Ingrese una fecha de contratacion!",
          },
        ]}
        hasFeedback
      >
        <DatePicker
        placeholder="Fecha de Contratacion"
        format='DD/MM/YYYY'
                  style={{ width: "100%" }}
                  onChange={onChange}
                />
      </Form.Item>

      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          Register
        </Button>
      </Form.Item>
      </Col>
    </Row>
    </Form>
    </>
  );
};

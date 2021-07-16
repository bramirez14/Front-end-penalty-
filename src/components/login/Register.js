import React, { useState } from "react";
import {
  Form,
  Input,
  Select,
  Button,
  DatePicker
} from "antd";
import {PeticionGET} from "../../config/PeticionGET";
import {axiosURL} from "../../config/axiosURL";
const { Option } = Select;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 6},
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

export const Register = ({history}) => {
  const [fecha, setFecha] = useState('')

  const onFinish = async (values) => {
    let cel= '11'.concat(values.cel)
    let valor = { ...values,fechaContratacion:fecha,cel}
    let res = await axiosURL.post('/register',valor);
    res.data.status===500 ? alert (res.data.message ) : history.push('/')
    
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
    <Form
      {...layout}
      
      name="register"
      onFinish={onFinish}
      initialValues={{
        prefix: "11",
      }}
  
      style={{ marginTop: "10px" }}
    >
      <Form.Item
        name="departamentoId"
        label="Departamento"
        rules={[
          {
            required: true,
            message: "Seleccione un dto!",
          },
        ]}
      >
       <Select>
       {dtos.map( d=>
          <Option value={d.id} key={d.id} >
            {d.departamento}
          </Option>
      )}
        </Select>
      </Form.Item>

      <Form.Item
        name="nombre"
        label="Nombre"
        rules={[
          {
            required: true,
            message: "Ingrese un nombre!",
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
            message: "Ingresa un Apellido!",
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
            type: "email",
            message: "No es un E-mail valido!",
          },
          {
            required: true,
            message: "Ingrese un  E-mail!",
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
        name="cel"
        label="Celular"
        /* rules={[
          {
            required: true,
            message: "Please input your phone number!",
          },
        ]} */
      >
        <Input
          addonBefore={prefixSelector}
          style={{
            width: "100%",
          }}
        />
      </Form.Item>

          <Form.Item name='tipousuario' label='Tipo de usuario' rules={ [{required:true,message:' Seleccione una opcion!'}]}>
          <Select>
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
        label="Categoria"
        rules={[
          {
            required: true,
            message: "Ingrese una categoria!",
          },
        ]}
      >
        <Select>
          <Option value='interno'>
            Interno
          </Option>
          <Option value='externo'>Externo</Option>
          </Select>
      </Form.Item>

      <Form.Item name='nvendedor' label=' Vendedor'
      tooltip={{ title: 'Si no es un vendedor ingresar 0000' }}
      rules={[{
          required: true,
          message: "Ingrese numero de vendedor!",
      }]}>
        <Input type='number'/>
      </Form.Item>

      <Form.Item
        name="fechaContratacion"
        label="Fecha de Contratacion"
      /*   rules={[
          {
            required: true,
            message: "Ingrese una fecha de contratacion!",
          },
        ]} */
      >
        <DatePicker
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
    </Form>
  );
};

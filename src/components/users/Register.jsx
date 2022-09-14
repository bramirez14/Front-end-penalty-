import  { useState } from "react";
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


export const Register = () => {
    const [fecha, setFecha] = useState('')
  const navigate=useNavigate();
  const onFinish = async (values) => {
    let cel= '11'.concat(values.cel)
    let valor = { ...values,fechaContratacion:fecha,cel}
    let res = await axiosURL.post('/register',valor);
    res.data.status===400 ? alert (res.data.message ) : navigate('/lista/usuarios')
  };

  const onChange = (date, dateString) => {
    setFecha(dateString)
  }
 
  const dtos = PeticionGET('/departamentos')
  
  
  return (
    <Form
    className='form-complete'
    style={{width:700}}
    onFinish={onFinish}
    initialValues={{
      prefix: "11",
    }}
    
    >
         <Button type="link" onClick={() => navigate(-1)} size="large">
        Volver
      </Button>
      <Titulo  titulo="Registro de Empleados" />
        <Divider/>
   
    <Row gutter={10} >
      <Col xs={24} sm={24} md={24} lg={12} xl={12}>
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
    </Col>

    <Col xs={24} sm={24} md={24} lg={12} xl={12}>
    

        <Form.Item name='tipousuario'  rules={ [{required:true,message:' !Seleccione una opcion!'}]}  hasFeedback>
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

        <Form.Item name='gerenteId'  rules={ [{required:true,message:' !Seleccione una opcion!'}]}  hasFeedback>
        <Select placeholder='Reportar a'>
        <Option value={1}>
        Esteban Ramos
        </Option>
        <Option value={3}>
          Cristian Rios
        </Option>
        <Option value={2}>
          Cristian DeSousa
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
      <Input type='number' placeholder=' Vendedor' />
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
      type='number'
      placeholder="Celular"
      />
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

    <Form.Item >
      <Button type="primary" htmlType="submit" block>
        Registrar
      </Button>
    
    </Form.Item></Col>
  </Row>
  </Form>
  )
}

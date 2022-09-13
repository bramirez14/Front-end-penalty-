import { Button, Form, Input,Select } from "antd";
import { useEffect, useState } from "react";
import { useGet } from "../../hooks/useGet";
import { useNavigate, useParams } from "react-router";
const { Option } = Select;

export const UpdateUser = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { id } = useParams();
  const [userId] = useGet(`${id}`);
 ;

  const onFinish = (values) => {
    console.log("Finish:", values);
  };
  
  return (
    <Form
      className="form-complete"
      form={form}
      name="horizontal_login"
      onFinish={onFinish}
      onChange={(fields) => {
        console.log(fields,'line25');
        console.log(fields.target.value);
        }}
        onValuesChange={(all, allFields) => {
      //onChange(allFields);
      console.log(allFields,'line29');
      console.log(all,'line30');

    }}
    >
      <Form.Item
        rules={[
          {
            required: true,
            message: "Please input your username!",
          },
        ]}
      >
        
        <Input placeholder="Nombre" value={userId.nombre}/>
      </Form.Item>
      <Form.Item
        rules={[
          {
            required: true,
            message: "Please input your password!",
          },
        ]}
      >
        <Input  placeholder="Apellido" value={userId.apellido} />
      </Form.Item>
      <Form.Item
        rules={[
          {
            required: true,
            message: "Please input your username!",
          },
        ]}
      >
        <Input placeholder="Email" value={userId.email} />
      </Form.Item>
      <Form.Item
          name="tipousuario"
          hasFeedback
        >
          <Select placeholder="Tipo de usuario">
            <Option value="Gerente">Gerente</Option>
            <Option value="Empleada">Empleada</Option>
            <Option value="Empleado">Empleado</Option>
            <Option>Visitante</Option>
          </Select>
        </Form.Item>
      <Form.Item
        rules={[
          {
            required: true,
            message: "Please input your username!",
          },
        ]}
      >
        <Input placeholder="Numero de Vendedor" value={userId.nvendedor} />
      </Form.Item>
      <Form.Item
        rules={[
          {
            required: true,
            message: "Please input your username!",
          },
        ]}
      >
        <Input placeholder="Contratacion" value={userId.fechaContratacion} />
      </Form.Item>
      <Form.Item
        rules={[
          {
            required: true,
            message: "Please input your username!",
          },
        ]}
      >
        <Input placeholder="Username" value={userId.cel}/>
      </Form.Item>
      <Form.Item
          name="epassword"
          placeholder="Contraseña"
          
          hasFeedback
        >
          <Input.Password placeholder="Contraseña" />
        </Form.Item>
        
        <Form.Item
          name="epassword2"
          dependencies={["epassword"]}
          hasFeedback
          rules={[
            
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("epassword") === value) {
                  return Promise.resolve();
                }

                return Promise.reject(
                  new Error("The two passwords that you entered do not match!")
                );
              },
            }),
          ]}
        >
          <Input.Password placeholder="Confirme Contraseña" />
        </Form.Item>
        
        <Form.Item
          name="categoria"
          
          hasFeedback
        >
          <Select placeholder="Categoria">
            <Option value="interno">Interno</Option>
            <Option value="externo">Externo</Option>
          </Select>
        </Form.Item>
      <Form.Item >
          <Button
            type="primary"
            htmlType="submit"
            
          >
            Log in
          </Button>
      </Form.Item>
    </Form>
  );
};

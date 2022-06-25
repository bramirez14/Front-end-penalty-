import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Row, Col, Button, Form, Input, Select, DatePicker } from "antd";
import { useEffect, useState } from "react";
import { axiosURL } from "../../config/axiosURL";
import { useGet } from "../../hooks/useGet";
const { Option } = Select;

export const EditarDatosUsuario = () => {
  const [userSelected, setUserSelected] = useState([]);
const [id, setId] = useState()
  const [form] = Form.useForm();
  const [, forceUpdate] = useState({}); // To disable submit button at the beginning.
  const [allUsers] = useGet("./allusers");
  const nameAndSurname = allUsers.map((t) => ({
    id: t.id,
    name: t.nombre + " " + t.apellido,
  }));
  useEffect(() => {
    forceUpdate({});
  }, []);

  const onChangeOnSearch = (value) => {
    let filterUser = allUsers.filter((user) => user.id === value);
    console.log(Object.keys(filterUser[0]));
    let obj = Object.keys(filterUser[0]);
    let newArrayValue = obj.map((o) => ({
      name: [o],
      value: filterUser[0][o],
    }));
    console.log(newArrayValue);

    setUserSelected(newArrayValue);
    setId(filterUser[0].id);
  };
console.log(id);

  const onFinish = async (values) => {
    console.log("Finish:", values);
    
    let res = await axiosURL.put(`./editar/usuario/${id}`,values);
    console.log(res);
  };

  return (
    <>
      <Form
        className='container-form'
        fields={userSelected}
        form={form}
        onFinish={onFinish}
      >
        <Row gutter={[20,20]}>
          <Col xs={24} sm={24} md={24} lg={24} xl={24}>
            <Select
              showSearch
              placeholder="Seleccione un empleado"
              optionFilterProp="children"
              onChange={onChangeOnSearch}
              onSearch={onChangeOnSearch}
              filterOption={(input, option) =>
                option.children.toLowerCase().includes(input.toLowerCase())
              }
            >
              {nameAndSurname.map((a) => (
                <Option value={a.id} key={a.id}>
                  {a.name}
                </Option>
              ))}
            </Select>
          </Col>
          <Col xs={24} sm={24} md={24} lg={12} xl={12}>
          <Form.Item
          name="nombre"
          rules={[
            {
              required: true,
              message: "Please input your username!",
            },
          ]}
        >
          <Input placeholder="Nombre" />
        </Form.Item>
        <Form.Item
          name="apellido"
          rules={[
            {
              required: true,
              message: "Please input your password!",
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
          <Input placeholder="E-mail" />
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
          </Col>
          <Col xs={24} sm={24} md={24} lg={12} xl={12}>
        

       

        <Form.Item name="cel" hasFeedback>
          <Input placeholder="Celular" />
        </Form.Item>

        <Form.Item
          name="tipousuario"
          rules={[{ required: true, message: " Seleccione una opcion!" }]}
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
            <Option value="interno">Interno</Option>
            <Option value="externo">Externo</Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="nvendedor"
          tooltip={{ title: "Si no es un vendedor ingresar 0000" }}
          rules={[
            {
              required: true,
              message: "Ingrese numero de vendedor!",
            },
          ]}
          hasFeedback
        >
          <Input type="number" placeholder=" Vendedor" />
        </Form.Item>
        <Form.Item >
            <Button type="primary" htmlType="submit">
              Log in
            </Button>
        </Form.Item>
          </Col>
        </Row>
        

       
        
      </Form>
    </>
  );
};

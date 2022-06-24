import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Row, Col, Button, Form, Input, Select } from "antd";
import { useEffect, useState } from "react";
import { useGet } from "../../hooks/useGet";
import { Try } from "./Try";
const { Option } = Select;

export const EditarDatosUsuario = () => {
  const [userSelected, setUserSelected] = useState();
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
    let filterUser= allUsers.filter(user => user.id === value);
    setUserSelected(filterUser);
  };
  
  

  const onFinish = (values) => {
    console.log("Finish:", values);
  };
 
  return (
    <>
    <Try/>
    <Form
      form={form}
      name="horizontal_login"
      layout="inline"
      onFinish={onFinish}
    >
      <Row>
        <Col xs={24} sm={24} md={24} lg={12} xl={12}>
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
        <Col></Col>
        <Col></Col>
      </Row>
      <Form.Item
        name='nombre'
        rules={[
          {
            required: true,
            message: "Please input your username!",
          },
        ]}
      >
        <Input placeholder="Nombre" value={userSelected?.nombre}/>
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
      <Form.Item shouldUpdate>
        {() => (
          <Button
            type="primary"
            htmlType="submit"
            disabled={
              !form.isFieldsTouched(true) ||
              !!form.getFieldsError().filter(({ errors }) => errors.length)
                .length
            }
          >
            Log in
          </Button>
        )}
      </Form.Item>
    </Form>

</>







  );
};

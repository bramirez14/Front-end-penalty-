import { Button, Form, Input, Select, Typography, Divider } from "antd";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { axiosURL } from "../config/axiosURL";
import Swal from "sweetalert2";

const { Option } = Select;
const { Title } = Typography;
export const UpdateUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [fields, setFields] = useState();
  const axiosGet = async () => {
    let { data } = await axiosURL.get(`/${id}`);
    setFields([
      {
        name: ["nombre"],
        value: data.nombre,
      },
      {
        name: ["apellido"],
        value: data.apellido,
      },
      {
        name: ["email"],
        value: data.email,
      },
      {
        name: ["nvendedor"],
        value: data.nvendedor,
      },
      {
        name: ["tipousuario"],
        value: data.tipousuario,
      },
      {
        name: ["fechaContratacion"],
        value: data.fechaContratacion,
      },
      {
        name: ["cel"],
        value: data.cel,
      },
    ]);
  };

  useEffect(() => {
    axiosGet();
  }, []);
  const onFinish = async (values) => {
    console.log(values);
    const isConfirmed = await Swal.fire({
      title: "Estas seguro",
      text: "¡NO podrás revertir esto!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Editar!",
    });
    if (isConfirmed) {
      const res = await axiosURL.put(`/editar/usuario/${id}`, values);
      console.log(res);
      Swal.fire("Editado!", "Se edito con exito!!!", "success");
      if(res.status === 200)navigate('/lista/usuarios')
    }
  };
  return (
    <>
      <Form
        className="form-complete"
        fields={fields}
        onFieldsChange={(_, allFields) => {
          setFields(allFields);
        }}
        onFinish={onFinish}
      >
        <Button type="link" onClick={() => navigate(-1)} size="large">
          Volver
        </Button>
        <Title level={3} style={{ textAlign: "center" }}>
          {" "}
          Editar Empleado{" "}
        </Title>
        <Divider />
        <Form.Item
          name="nombre"
          label="Nombre"
          rules={[
            {
              required: true,
              message: "Username is required!",
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
              message: "Username is required!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="email"
          label="Email"
          rules={[
            {
              required: true,
              message: "Username is required!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="nvendedor"
          label="N vendedor"
          rules={[
            {
              required: true,
              message: "Username is required!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item name="tipousuario" label="Usuario" hasFeedback>
          <Select placeholder="Tipo de usuario">
            <Option value="Gerente">Gerente</Option>
            <Option value="Empleada">Empleada</Option>
            <Option value="Empleado">Empleado</Option>
            <Option>Visitante</Option>
          </Select>
        </Form.Item>
        <Form.Item
          name="fechaContratacion"
          label="Contrato"
          rules={[
            {
              required: true,
              message: "Please input your username!",
            },
          ]}
        >
          <Input placeholder="Contrato" />
        </Form.Item>
        <Form.Item
          name="cel"
          label="Celular"
          rules={[
            {
              required: true,
              message: "Please input your username!",
            },
          ]}
        >
          <Input placeholder="Celular" />
        </Form.Item>
        <Form.Item name="epassword" label="Contraseña" hasFeedback>
          <Input.Password placeholder="Contraseña" />
        </Form.Item>

        <Form.Item
          name="epassword2"
          label="Repita Contraseña"
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

        <Form.Item name="categoria" label="Categoria" hasFeedback>
          <Select placeholder="Categoria">
            <Option value="interno">Interno</Option>
            <Option value="externo">Externo</Option>
          </Select>
        </Form.Item>
        <Form.Item>
          <Button type="primary" block htmlType="submit">
            Editar Empleado
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

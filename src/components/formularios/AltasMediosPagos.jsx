import { CreditCardOutlined } from "@ant-design/icons";
import { Button, Divider, Form, Input, Radio } from "antd";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { axiosURL } from "../../config/axiosURL";
import { Titulo } from "../titulos/Titulo";

export const AltasMediosPagos = () => {
  const inicialState = [
    {
      name: ["mediopago"],
      value: "",
    },
    {
      name: ["tarjeta"],
      value: "",
    },
  ];
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const [, forceUpdate] = useState({}); // To disable submit button at the beginning.
  const [fields, setFields] = useState(inicialState);
  useEffect(() => {
    forceUpdate({});
  }, []);
  const onFinish = async (values) => {
    let res;
    if (values.mediopago === "TC") {
      res = await axiosURL.post("/agregar/tc", values);
    } else {
      res = await axiosURL.post("/alta/medios/pagos", values);
    }

    if (res.data.status === 200) {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Se agrego con exito!!!",
        showConfirmButton: false,
        timer: 2000,
      });
      setFields(inicialState);
    }
  };
  return (
    <Form
      fields={fields}
      className="container-form"
      form={form}
      onFinish={onFinish}
      labelCol={{
        span: 5,
      }}
      wrapperCol={{
        span: 16,
      }}
    >
      <Titulo titulo="Agregar Medio de Pago" />
      <Divider />
      <Form.Item name="mediopago" 
      rules={[
        {
          required: true,
          message: "Por favor seleccione una opcion!",
        },
      ]}
      >
        <Radio.Group>
          <Radio value="TC"> Tarjeta de Credito </Radio>
          <Radio value="O"> Otro medio de pago</Radio>
        </Radio.Group>
      </Form.Item>
      <Form.Item
        name="tarjeta"
        rules={[
          {
            required: true,
            message: "Por favor Ingrese un medio de pago!",
          },
        ]}
      >
        <Input
          prefix={<CreditCardOutlined className="site-form-item-icon" />}
          placeholder="Username"
        />
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
            Guardar
          </Button>
        )}
      </Form.Item>
    </Form>
  );
};

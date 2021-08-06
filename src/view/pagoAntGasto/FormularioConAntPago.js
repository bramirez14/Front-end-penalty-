import React from "react";
import { Form, Input } from "antd";

export const FormularioConAntPago = ({ orden, importe }) => {
  return (
    <Form layout="vertical">
      <Form.Item label="Importe a pagar">
        <Input value={"$" + importe} disabled />
      </Form.Item>
    </Form>
  );
};

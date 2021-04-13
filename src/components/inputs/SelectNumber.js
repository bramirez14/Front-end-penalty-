import React from "react";
import { Form,Select } from "antd";
import "./selectt.css";
export const SelectNumber = ({ name,array, placeholder,change,mensaje}) => {
console.log(placeholder);
  const { Option } = Select;
 
  return (
    <Form.Item
    name={name}
    hasFeedback
    rules={[
      {
        required: true,
        message: mensaje,
      },
    ]}
  >
    <Select
      className="select-empleado"
      placeholder={placeholder}
      onChange={change}
    >

      {array?.map((a) => (
        <Option  key={a.id} value={a.id}>
          {a.nombre}
        </Option>
      ))}
    </Select>
    </Form.Item>
  );
};

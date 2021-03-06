import React from "react";
import { Form,Select } from "antd";
import "./select.css";
export const SelectAnt = ({ name,array, placeholder,change,mensaje,label}) => {
 
  const { Option } = Select;
  function onSearch(val) {
    console.log("search:", val);
  }
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
    label={label}
  >
    <Select
  name={name}
      className="select-empleado"
      showSearch
      placeholder={placeholder}
      optionFilterProp="children"
      onSearch={onSearch}
      onChange={change}
    >
      {array?.map((a) => (
        <Option key={a.id} value={a.id}>
          {a.nombre}
        </Option>
      ))}
    </Select>
    </Form.Item>
  );
};

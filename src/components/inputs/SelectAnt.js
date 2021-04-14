import React from "react";
import { Form,Select } from "antd";
import "./selectt.css";
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
 
      className="select-empleado"
      showSearch
      placeholder={placeholder}
      optionFilterProp="children"
      onSearch={onSearch}
      filterOption={(input, option) =>

        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
      }
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

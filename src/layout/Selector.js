import React from 'react';
import { Select } from 'antd';
import './css/selector.css'
const { Option } = Select;
export const Selector = ({columna}) => {
    function handleChange(value) {
        console.log(`selected ${value}`);
    }
  return   <Select defaultValue="lucy" style={{ width: 120 }} onChange={handleChange}>
  <Option value="jack">Jack</Option>
 
</Select>
};

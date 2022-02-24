import React from 'react';
import { Input, Space } from 'antd';
import { AudioOutlined } from '@ant-design/icons';
import './css/buscador.css'

const { Search } = Input;
export const Buscador = () => {
    const onSearch = value => console.log(value);
  return <Search
  className='buscador'
  placeholder="que necesitas buscar"
  allowClear
  enterButton
  size="large"
  onSearch={onSearch}
/>
};

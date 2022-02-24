import React from 'react';
import { Input } from 'antd';
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

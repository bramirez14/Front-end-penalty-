import React, { useState } from 'react'
import { Descriptions, Select } from 'antd';

import { PeticionGETIntranetCobranzas } from '../../config/PeticionGET';


const { Option } = Select;
export const ClienteRecibo = () => {
    const [cliente, setCliente] = useState({})
    const  ctesRecibos= PeticionGETIntranetCobranzas('/recibos')
    
    
    function onChange(value) {
        console.log(`selected ${value}`);
        const buscarCte= ctesRecibos.find(c=> value=== c.razonsoc)
        setCliente(buscarCte)
    }
      
      function onBlur() {
        console.log('blur');
      }
      
      function onFocus() {
        console.log('focus');
      }
      
      function onSearch(val) {
        console.log('search:', val);
      }
      console.log(cliente,'line 30');
    return (
        <>
        <Select
    showSearch
    style={{ width: 300 }}
    placeholder="Select a person"
    optionFilterProp="children"
    onChange={onChange}
    onFocus={onFocus}
    onBlur={onBlur}
    onSearch={onSearch}
    filterOption={(input, option) =>{

        const opfinal= option.children===null?'':option.children
      return opfinal.toLowerCase().indexOf(input.toLowerCase()) >= 0

    }
    }
  >
        {ctesRecibos.map(c=>
            <Option value={c.razonsoc}>{c.razonsoc}</Option>
        )}
 

  </Select>
  
    <Descriptions title="Recibo Provisorio">
    <Descriptions.Item label="Recibimos de">{cliente.razonsoc}</Descriptions.Item>
    <Descriptions.Item label="Cliente N°">{cliente.numctacte}</Descriptions.Item>
    <Descriptions.Item label="Domicilio">{cliente.direccion}</Descriptions.Item>
    <Descriptions.Item label="Localidad">{cliente.localidad}</Descriptions.Item>
    <Descriptions.Item label="Provinca"> {cliente.provincia} </Descriptions.Item>
  </Descriptions>
  </>
    )
}

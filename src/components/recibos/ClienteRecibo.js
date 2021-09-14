import React from 'react'
import { Row, Col, Descriptions, Select, Statistic, Card } from 'antd';

import { filtradoPorVendedorCobranzas } from './helpers/funciones';


const { Option } = Select;
export const ClienteRecibo = ({cliente, setCliente}) => {
    const  ctesRecibos= filtradoPorVendedorCobranzas('/recibos')
    
    function onChange(value) {
        const buscarCte= ctesRecibos.find(c=> value=== c.razonsoc)
        setCliente(buscarCte)
    }
      
      function onSearch(val) {
        console.log('search:', val);
      }
    return (
        <>
      
          <Card style={{height:224}} >
             <Select
    showSearch
    style={{ width: 300 }}
    placeholder="Select a person"
    optionFilterProp="children"
    onChange={onChange}
    onSearch={onSearch}
    filterOption={(input, option) =>{

        const opfinal= option.children===null?'':option.children
      return opfinal.toLowerCase().indexOf(input.toLowerCase()) >= 0

    }
    }
  >
        {ctesRecibos.map(c=>
            <Option key ={c.id} value={c.razonsoc}>{c.razonsoc}</Option>
        )}
 

  </Select>
  
    <Descriptions title="Recibo Provisorio" style={{marginTop:20}}>
    <Descriptions.Item label="Recibimos de">{cliente.razonsoc}</Descriptions.Item>
    <Descriptions.Item label="Cliente N°">{cliente.numctacte}</Descriptions.Item>
    <Descriptions.Item label="Domicilio">{cliente.direccion}</Descriptions.Item>
    <Descriptions.Item label="Localidad">{cliente.localidad}</Descriptions.Item>
    <Descriptions.Item label="Provinca"> {cliente.provincia} </Descriptions.Item>
    <Descriptions.Item label="n vendedor"> {cliente.vendedor} </Descriptions.Item>
    </Descriptions>
          </Card>
         
    

       
       
  </>
    )
}

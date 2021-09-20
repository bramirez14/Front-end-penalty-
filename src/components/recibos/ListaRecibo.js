import React from 'react'
import { List, Typography, Divider,Button } from 'antd';
import { PeticionGETIntranetCobranzas } from '../../config/PeticionGET';
const data = [
    'Racing car sprays burning fuel into crowd.',
    'Japanese princess to wed commoner.',
    'Australian walks 100km after outback crash.',
    'Man charged over missing wedding girl.',
    'Los Angeles battles huge wildfires.',
  ]

  export const ListaRecibo = ({ history}) => {

    const getRecibos= PeticionGETIntranetCobranzas('/ingresos/recibos');
    const numerorecibo=getRecibos[0]?.map(g=>g.numerorecibo);
    const nreciboSinRecibo= [...new Set(numerorecibo)]
    const handleNrecibo=(item)=> {
    console.log(item);
    history.push(`/carga/recibo/${item}`)
 }
    return (
        <>
        <List
        style={{ width:500,backgroundColor:'#ffff',margin:'auto',marginTop:20,}}
      header={<h2>Listas de Recibos</h2>}
      footer={<div></div>}
      bordered
      dataSource={nreciboSinRecibo.reverse()}
      renderItem={item => (
        <List.Item
        actions={[<Button onClick={() => handleNrecibo(item)}>Ingresar</Button>]}
        >
          <Typography.Text >N° de recibo: </Typography.Text>  <b> {item} </b> 
        </List.Item>
      )}
    />  
        </>
    )
}

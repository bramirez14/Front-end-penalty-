import React from 'react'
import { List, Button } from 'antd';
import { PeticionGETIntranetCobranzas } from '../../config/PeticionGET';

  export const ListaRecibo = ({ history}) => {
 /**evitar que usuari 907 ingresen a la ruta */
 const N = localStorage.getItem('N');
 ( N !== "907" && N!== '901' )&& history.push("/perfil");
    const getRecibos= PeticionGETIntranetCobranzas('/ingresos/recibos');
    const numerorecibo=getRecibos[0]?.map(g=>g.numerorecibo);
    const nreciboSinRecibo= [...new Set(numerorecibo)]
    const handleNrecibo=(item)=> {
    history.push(`/carga/recibo/${item}`)
 }
    return (
        <>
        <List
        className='lista-recibo'
      header={<h2>Listas de Recibos</h2>}
      footer={<div></div>}
      bordered
      dataSource={nreciboSinRecibo.reverse()}
      renderItem={item =>{
        const filtro=getRecibos[1].filter(g=>g.numerorecibo===item)
        return(
        <List.Item
        actions={[<Button onClick={() => handleNrecibo(item)}>Ingresar</Button>]}
        >
      <div className='descripciones-recibo'>
       <span className='item-recibo' >  N° de recibo: </span> <b className='item-recibo'> {item} </b> 
       <span className='item-recibo' >{filtro[0]?.razonsocial}</span>
       <span className='item-recibo' >N de comprobante: <b >{filtro[0]?.ncomprobante}</b></span>
       </div>
        </List.Item>
      )}
    
    }
    />  
        </>
    )
}

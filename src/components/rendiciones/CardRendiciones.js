import React from "react";
import "./css/cardRendiciones.css";
import { Button, Card } from "antd";
import {Link} from 'react-router-dom'
import { List,  } from 'antd';
import { axiosURL } from "../../config/axiosURL";

export const CardRendiciones = ({data,axiosGet,imagen,categoria,importe,fecha,notas,uid}) => {
 const handleDeleteRendicion = async (id)=> {
   await axiosURL.delete(`/delete/rendicion/gasto/${id}`)
   axiosGet();
  
 }
  return (
    <>
   
    <List
    itemLayout="vertical"
    size="large"
    dataSource={data}
  bordered={true}
  pagination={{
    pageSize: 4,
  }}
  className="list-card"
    renderItem={item => (
      <List.Item
        key={item.title}
        actions={[
          <div style={{display:'flex',flexWrap:'nowrap'}}>
            <Link
          to={`/editar/rendicion/${item.id}`}>
        <Button
          style={{ borderRadius:'10px'}}
        >
        Editar
        </Button>
        </Link>
        
        <Button onClick={() => handleDeleteRendicion(item.id)}
          style={{ borderRadius:'10px',marginLeft:20,}}
        >
      Borrar
        </Button>
    
          </div>
          ]}
          extra={
            <img
            width={272}
            height={200}
            alt="logo"
            src={item.imagen}
          />
            }
      >
        <List.Item.Meta
         
        />
         <div >
             <h2> <b> Categoria:</b> {item.categoria}</h2>
             <h2> <b>Importe:</b> $  {item.importe}</h2>
             <h2> <b>fecha de ingreso:</b>  {item.fecha} </h2>
            <h2> <b>Descripcion:</b> {item.notas} </h2 > 
            </div>
      </List.Item>
    )}
  />


  </>
    
      
    
  );
};

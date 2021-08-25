import React from "react";
import "./css/cardRendiciones.css";
import { Card,Avatar,Button,Row,Col } from "antd";
import {Link} from 'react-router-dom'
import { List, Space } from 'antd';
export const CardRendiciones = ({data,imagen,categoria,importe,fecha,notas,id}) => {
  console.log(data);
 const {Meta}= Card
  return (
    <>
    <List
    itemLayout="vertical"
    size="large"
    dataSource={data}
  bordered={true}
  className="list-card"
    renderItem={item => (
      <List.Item
        key={item.title}
        actions={[
          <div>
            <Link
          to={`/editar/rendicion/${item.id}`}>
        <Button
        block
          style={{ borderRadius:'10px'}}
        >
        Editar
        </Button>
        </Link>
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

import React from 'react'
import { List, Avatar } from 'antd';
import { PeticionGET } from '../../config/PeticionGET';
import { Button } from 'antd/lib/radio';
import { ModalKm } from './ModalKm';
import { TablaInfkm } from './TablaInfkm';
import {Link} from "react-router-dom";

export const CardKm = () => {
    const id= localStorage.getItem('uid') 
    const peticionKM=PeticionGET('/todos/kilometros');
    const filtroIdUsuario= peticionKM.filter(p=>p.usuarioId === parseInt(id));
   
    return (
      <>
    <div>
      <Button> <Link to='/kilometros'> Ingresar Rendicion </Link> </Button>
    </div>
        <List
        itemLayout="vertical"
        size="large"
        dataSource={filtroIdUsuario}
        style={{backgroundColor:'#fff', marginTop:20}}
        pagination={{
   
          pageSize: 4,
        }}
        renderItem={item => (
          <List.Item

            key={item.id} 
           
            extra={
              <img
                width={200}
                height={200}
                alt="logo"
                src={item.imagen}
              />
            }
          >
            <List.Item.Meta
              avatar={<Avatar src={item.usuario.imagen} />}
              title={<p> {item.usuario.nombre} {item.usuario.apellido}</p>}
            />
            {item.content}
            <p>Importe Total: {item.importeTotal} </p>
            <p>Km Total: {item.kmTotal}</p>
            <ModalKm title={'Informacion'} boton={'Inf'} longModal={800}>
            <TablaInfkm data={item.rendicionKm}/>
            </ModalKm>
          </List.Item>
        )}
      />
      </>
    )
}

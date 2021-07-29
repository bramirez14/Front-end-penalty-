import React from 'react'
import { List, Avatar } from 'antd';
import { PeticionGET } from '../../config/PeticionGET';
import { Button } from 'antd/lib/radio';
import { ModalKm } from './ModalKm';
import { TablaInfkm } from './TablaInfkm';
export const CardKm = () => {
    const peticionKM=PeticionGET('/todos/kilometros')
    console.log(peticionKM);
    return (
        <List
        itemLayout="vertical"
        size="large"
        dataSource={peticionKM}
        footer={
          <div>
            <Button>Ingresar Rendicion</Button>
          </div>
        }
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
            <ModalKm title={'Informacion'} boton={'Inf'}>
            <TablaInfkm data={item.rendicionKm}/>
            </ModalKm>
          </List.Item>
        )}
      />
    )
}

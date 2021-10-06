import React,{ useState } from 'react'
import {Button, Form, Row, Col} from 'antd'
import { Files } from '../../helpers/Files'
import { axiosURL } from '../../config/axiosURL'
import { PeticionGET } from '../../config/PeticionGET'
export const TarjetaCredito = ({ history}) => {
    const id= localStorage.getItem('uid')
    const get = PeticionGET(`/${id}`)

    const onFinish = async(values) => {
    console.log('Success:', values.file[0].originFileObj);
    let f = new FormData();
    f.append("file",values.file[0].originFileObj);
    f.append('nombre',get.nombre);
    f.append('apellido',get.apellido);
    let res =  await axiosURL.post('/tarjeta/credito',f)
    console.log(res);
   if (res.data.status === 200) {history.push('/perfil')}
     
  };
    return (
        <Form
        
        name="validate_other"
        onFinish={onFinish}
        >
        <Files />

            <Form.Item
        
      >
        <Button type="primary" htmlType="submit">
          Guardar
        </Button>
      </Form.Item>
        </Form>
    
    )
}

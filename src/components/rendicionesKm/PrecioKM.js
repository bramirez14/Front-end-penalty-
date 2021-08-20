import { Form,Input,Button} from 'antd'
import React from 'react'
import { axiosURL } from '../../config/axiosURL'

export const PrecioKM = ({ history}) => {
    const handleSubmit= async (values) =>{
        console.log(values);
       const res= await axiosURL.put('/precio/km',values)
       if(res.status=== 200){
           history.push('/perfil')
       }
    }
    return (
        <div className='container' style={{width:500}}>
<Form onFinish={handleSubmit}>
           <Form.Item
        name="precio"
        rules={[
          {
            required: true,
            message: 'Ingrese un importe !',
          },
        ]}
      >
        <Input placeholder='Ingrese un importe' type='number' min={0}/>

      </Form.Item>
      <Form.Item
       
      >
        <Button type="primary" htmlType="submit" block>Enviar</Button>
        
      </Form.Item>
        </Form>
        </div>
        
    )
}

import { Row, Col, Form,Input,Button, Statistic} from 'antd'
import React from 'react'
import { axiosURL } from '../../config/axiosURL'
import { useGet } from '../../hooks/useGet'
import Swal from 'sweetalert2'
import './css/preciokm.css'
import { useNavigate } from 'react-router'
export const PrecioKM = ( ) => {
  const navigate= useNavigate();
    const [preciokmActual,axiosGet]= useGet('/precio/km');
console.log(preciokmActual);
    const handleSubmit= async (values) =>{
        console.log(values);
       const res= await axiosURL.put('/precio/km',values)
       console.log(res);
       if(res.status=== 200){
        /* axiosGet(); */
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Se cambio el precio del km con exito!!!',
          showConfirmButton: false,
          timer: 1500
        })
        navigate('/perfil')
    }
  }
    return (
        <div className='container-km'>
          <Row gutter={[20,70]}>
            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
            <Statistic title="Precio Actual" value={preciokmActual[0]?.precio} />
          </Col>
         
          <Col xs={24} sm={24} md={24} lg={24} xl={24}>
            <Form onFinish={handleSubmit} >
           <Form.Item
        name="precio"
        rules={[
          {
            required: true,
            message: 'Ingrese un importe!',
          },
        ]}
      >
        <Input placeholder='Ingrese un importe' type='number' min={0} />

      </Form.Item>
      <Form.Item
       
      >
        <Button style={{marginTop:20}}type="primary" htmlType="submit" block>Enviar</Button>
        
      </Form.Item>
        </Form>
          </Col>
      
        </Row>
        </div>
        
    )
}

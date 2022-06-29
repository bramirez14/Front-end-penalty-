
import { CreditCardOutlined } from '@ant-design/icons';
import { Button, Divider, Form, Input } from 'antd';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { axiosURL } from '../../config/axiosURL';
import { Titulo } from '../titulos/Titulo';

export const AltasMediosPagos= () => {
  const [form] = Form.useForm();
  const [, forceUpdate] = useState({}); // To disable submit button at the beginning.
  const [fields, setFields] = useState([
    {
      name: ['pago'],
      value: '',
    },
  
  ]);
  useEffect(() => {
    forceUpdate({});
  }, []);

  const onFinish = async (values) => {
    console.log('Finish:', values);
    const res = await axiosURL.post('/alta/medios/pagos',values)
    console.log(res);
    if(res.data.status === 200){
      Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Se agrego con exito!!!',
      showConfirmButton: false,
      timer: 2000
    })
setFields([{
  name:['pago'],
  value:''
}])
    }
    
  };
  return (
    <Form 
    fields={fields}
    className='container-form'
    form={form}  onFinish={onFinish} labelCol={{
        span: 5,
      }}
      wrapperCol={{
        span: 16,
      }}>
          <Titulo titulo="Agregar Medio de Pago" />
        <Divider/>
      <Form.Item
        name="pago"
        rules={[
          {
            required: true,
            message: 'Please input your username!',
          },
        ]}
      >
        <Input prefix={<CreditCardOutlined  className="site-form-item-icon" />} placeholder="Username" />
      </Form.Item>
    
      <Form.Item shouldUpdate>
        {() => (
          <Button
            type="primary"
            htmlType="submit"
            disabled={
              !form.isFieldsTouched(true) ||
              !!form.getFieldsError().filter(({ errors }) => errors.length).length
            }
          >
            Guardar
          </Button>
        )}
      </Form.Item>
    </Form>
  );
};


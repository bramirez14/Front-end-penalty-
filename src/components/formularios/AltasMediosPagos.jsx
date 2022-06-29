
import { CreditCardOutlined } from '@ant-design/icons';
import { Button, Divider, Form, Input, Radio } from 'antd';
import { useDispatch } from "react-redux";
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { axiosURL } from '../../config/axiosURL';
import { Titulo } from '../titulos/Titulo';
import { addCreditCard } from '../../redux/actions/rendicionAction';

export const AltasMediosPagos= () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
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
    console.log(values);
    if (values.tarjeta==='TC'){
      let resp = await dispatch(addCreditCard(values));
      console.log(resp);
    }
  /*   const res = await axiosURL.post('/alta/medios/pagos',values)
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
    } */
    
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
        <Form.Item name="tarjeta" label="Medio de Pago">
        <Radio.Group>
          <Radio value="TC"> Tarjeta de Credito </Radio>
          <Radio value="O"> Otro medio de pago</Radio>
        </Radio.Group>
      </Form.Item>
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


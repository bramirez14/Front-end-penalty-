
import { CreditCardOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
import { useEffect, useState } from 'react';
import { axiosURL } from '../../config/axiosURL';

export const AltasMediosPagos= () => {
  const [form] = Form.useForm();
  const [, forceUpdate] = useState({}); // To disable submit button at the beginning.

  useEffect(() => {
    forceUpdate({});
  }, []);

  const onFinish = async (values) => {
    console.log('Finish:', values);
    const res = await axiosURL.post('/alta/medios/pagos',values)
    console.log(res);
  };

  return (
    <Form 
    className='container-form'
    form={form}  onFinish={onFinish} labelCol={{
        span: 5,
      }}
      wrapperCol={{
        span: 16,
      }}>
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
            Log in
          </Button>
        )}
      </Form.Item>
    </Form>
  );
};


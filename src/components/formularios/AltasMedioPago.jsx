
import { LockOutlined, CreditCardOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
import { useEffect, useState } from 'react';

export const AltasMedioPago = () => {
  const [form] = Form.useForm();
  const [, forceUpdate] = useState({}); // To disable submit button at the beginning.

  useEffect(() => {
    forceUpdate({});
  }, []);

  const onFinish = (values) => {
    console.log('Finish:', values);
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


import { Button, Form, Input, Modal, Radio } from 'antd';
import { useState } from 'react';

const CollectionCreateForm = ({ visible, onCreate, onCancel,title,okText,cancelText,children}) => {
  const [form] = Form.useForm();
  const datosForm = async () => {
    try {
      let res = await form.validateFields();
      await form.resetFields();
      onCreate(res);
    } catch (error) {
      console.log('Validate Failed:', error);
    }
  }
  return (
    <Modal
      visible={visible}
      title={title}
      okText={okText}
      cancelText={cancelText}
      onCancel={onCancel}
      onOk={datosForm}
    >
      <Form
        form={form}
        layout="vertical"
        name="form_in_modal"
        initialValues={{
          modifier: 'public',
        }}
      >
        {children}
      </Form>
    </Modal>
  );
};

export const FormModal = ({title,okText,cancelText,children,btnModal,property}) => {
  const [visible, setVisible] = useState(false);

  const onCreate = (values) => {
    console.log('Received values of form: ', values);
    setVisible(false);
  };

  return (
    <div>
      <Button
        {...property}
        onClick={() => {
          setVisible(true);
        }}
      >
        {btnModal}
      </Button>
      <CollectionCreateForm
        visible={visible}
        onCreate={onCreate}
        title={title}
        okText={okText}
        cancelText={cancelText}
         onCancel={() => {
          setVisible(false);
        }}
      >
       { children }
      </CollectionCreateForm>
    </div>
  );
};

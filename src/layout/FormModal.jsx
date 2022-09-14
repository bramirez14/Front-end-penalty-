
import { useState,useEffect } from 'react';
import { Button, Form, Modal, Alert} from 'antd';
import { axiosURL } from '../config/axiosURL';

const CollectionCreateForm = ({ visible, onCreate, onCancel,title,okText,cancelText,children,cambio}) => {
  const [form] = Form.useForm();
  const datosForm = async () => {
    try {
      let res = await form.validateFields();
      await form.resetFields();
    let result= await onCreate(res);
    } catch (error) {
     return('Validate Failed:', error);
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

export const FormModal = ({title,okText,cancelText,children,btnModal,property,url,cambio} = {}) => {
  const [visible, setVisible] = useState(false);

  const onCreate = async(values) => {
    let f = new FormData();
      f.append("file", values.file?.[0]?.originFileObj);
    let result = await axiosURL.post(url, f);
    setVisible(false);
    cambio(result);

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
        cambio={cambio}
      >
        
       { children }
      </CollectionCreateForm>
    </div>
  );
};

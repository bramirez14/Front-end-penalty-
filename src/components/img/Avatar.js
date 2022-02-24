import React, { useState, useEffect } from "react";
import "./avatar.css";
import { AntDesignOutlined, CameraOutlined,   } from '@ant-design/icons';
import {axiosURL }from "../../config/axiosURL";

import { Form, Modal, Avatar  } from "antd";
import { SubirImagen } from "./SubirImagen";


const CollectionCreateForm = ({ visible, onCreate, onCancel }) => {
  const [form] = Form.useForm();
  return (
    <Modal
    
      visible={visible}
      title="Create a new collection"
      okText="Create"
      cancelText="Cancel"
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields();
            onCreate(values);
          })
          .catch((info) => {
            console.log('Validate Failed:', info);
          });
      }}
    >
      <Form
        form={form}
        layout="vertical"
        name="form_in_modal"
        initialValues={{
          modifier: 'public',
        }}
      >
       <SubirImagen/>
      </Form>
    </Modal>
  );
};


export const AvatarImg = () => {
 const id = localStorage.getItem('uid');

 const [visible, setVisible] = useState(false);

 
const [imgDB, setImgDB] = useState();
/**Llamando la img del usuario si es que  hay  */
const peticionDeUsuario=async()=>{
let res=await axiosURL.get(`/${id}`)
 setImgDB(res.data.imagen)
 console.log('hola me llamaron');
}
useEffect(() => {
  peticionDeUsuario()
}, [peticionDeUsuario])

  const onCreate = async (values) => {

   console.log('Received values of form: ', values.file[0].originFileObj);
   let d = new FormData();
   d.append("imagen", values.file[0].originFileObj);
const response = await axiosURL.put(`/${id}`, d);
console.log(response);
   setVisible(false);
   peticionDeUsuario();
 };
  
  
  return (
 
        <div style={{position:'relative'}}>
        <Avatar src={imgDB}
    size={{
      xs: 100,
      sm: 100,
      md: 200,
      lg: 300,
      xl: 300,
      xxl: 400,
    }}
    icon={<AntDesignOutlined  />}
    style={{ 
    boxShadow:' 0px 10px 10px  rgba(92, 99, 105, 0.5)'
  }}
  />
        <CameraOutlined className="avatar" onClick={() => {
      setVisible(true);
    }} />
      <CollectionCreateForm
        visible={visible}
        onCreate={onCreate}
        onCancel={() => {
          setVisible(false);
        }}
      />
    </div>
  );
};

import { useState } from "react";
import {
    Form,
    Upload,
    Button
  } from 'antd';
import { axiosURL } from '../config/axiosURL';
import { useNavigate } from "react-router";

export const ExcelComponent = () => {
  const [loading, setLoading] = useState(false);
const navigate=useNavigate();

  const normFile =  (e) => {
    if (Array.isArray(e)) {
      return e;
    }
  
    return e && e.fileList;
  };
  const onFinish = async (values) => {
    setLoading(true);
    let f = new FormData();
    f.append("file", values.file[0].originFileObj);
    await axiosURL.post('/reportes/file/excel', f)

   setTimeout(() => {
   setLoading(false);
    navigate('/')}, 7000);

  }
  return (
    <Form
    onFinish={onFinish}
    className='form-complete'
    >

    <Form.Item
    name='file'
    label="file"
    valuePropName="fileList"
    getValueFromEvent={normFile}
    extra="acepta: xlsx"

  >
    <Upload  name='file'  listType="picture" maxCount={1} accept=".xlsx"
        beforeUpload={true}
    
    >
      <Button >Deposito</Button>
    </Upload>
  </Form.Item>
  <Form.Item
       
      >
        <Button type="primary" htmlType="submit" block='true' loading={loading}>
          Actualizar
        </Button>
      </Form.Item>
  </Form>

  )
}

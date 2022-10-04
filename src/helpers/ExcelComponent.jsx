import { useState } from "react";
import {
    Form,
    Upload,
    Button
  } from 'antd';
import { axiosURL } from '../config/axiosURL';
import { useNavigate } from "react-router";
import Swal from "sweetalert2";

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
    let response = await axiosURL.post('/reportes/file/excel', f)
    console.log(response.data);
      if (response.data.status === 200){
        setLoading(false);
        Swal.fire({
         position: 'center',
         icon: 'success',
         title: 'Se guardó con éxito',
         showConfirmButton: false,
         timer: 1500
       })
       navigate('/')
      }
  }
console.log(loading);
  return (
    <Form
    onFinish={onFinish}
    className='form-complete'
    style={{width:570}}
    >

    <Form.Item
    name='file'
    label="file"
    valuePropName="fileList"
    getValueFromEvent={normFile}
    extra="acepta: xlsx"
    rules={[
      {
        required: true,
        message: "ingrese un archivo",
      }
    ]} 
            

  >
    <Upload  name='file'  listType="picture" maxCount={1} accept=".xlsx"
        beforeUpload={()=>false}
    
    >
      <Button >Ingrese un archivo Excel</Button>
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

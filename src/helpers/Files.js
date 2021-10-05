import React,{ useState } from "react";
import { Form, Button, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { axiosURL } from "../config/axiosURL";
export const Files = () => {
  const [state, setState] = useState([])
  const normFile =  (e) => {
    console.log('Upload event:', e);
    setState(e.file.response)
   
    if (Array.isArray(e)) {
      return e;
    }
  
    return e && e.fileList;
  };

  const remove =  (e) => {
    console.log('Removed:', e.status);
    console.log('Removed:', e);
if(e.status === 'done'){
    let idfileCreado= e.response.result.id;
    axiosURL.post(`/file/delete/${idfileCreado}`,{type:e.type})
    }
 
  };
 
console.log(state);
  return (
      <Form.Item
        name="file"
        valuePropName="fileList"
        getValueFromEvent={normFile}
        extra='acepta : .jpg .jpeg .png .pdf .jfif'
      >

        <Upload name='file'  listType="picture" maxCount={1} accept=".jpg, .jpeg, .png, .pdf, .jfif" 
        action='http://localhost:4000/api/file' 
        onRemove= {remove}
        >
          <Button icon={<UploadOutlined />}>Subir Archivo </Button>
        </Upload>
      </Form.Item>
    
    
  );
};

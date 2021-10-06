import { Form, Button, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import './files.css'
export const Files = () => {
  const normFile =  (e) => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
  
    return e && e.fileList;
  };
 
  return (
    
      <Form.Item
        name="file"
        valuePropName="fileList"
        getValueFromEvent={normFile}
        extra='acepta : .jpg .jpeg .png .pdf .jfif'
        className="upload-list-inline"
      >

        <Upload name='file'  listType="picture" maxCount={1} accept=".jpg, .jpeg, .png, .pdf, .jfif" 
        beforeUpload={true}
        >
          <Button icon={<UploadOutlined />}> Subir Archivo </Button>
        </Upload>
      </Form.Item>
    
    
  );
};

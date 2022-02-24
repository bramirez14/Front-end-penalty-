import { Upload, Form, Button } from "antd";
import { UploadOutlined } from "@ant-design/icons";

export const SubirImagen = ({ setFile }) => {
  const normFile = (e) => {
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
      extra="acepta : .jpg .jpeg .pdf"
    >
      <Upload
        name="file"
        listType="picture"
        maxCount={1}
        accept=".jpg, .jpeg, .png"
        beforeUpload={true}
        className="upload-list-inline2"
      >
        <Button
          style={{ boxShadow: "#46a461", borderColor: "#54c875" }}
          icon={<UploadOutlined />}
        >
          {" "}
          Subir Imagen{" "}
        </Button>
      </Upload>
    </Form.Item>
  );
};

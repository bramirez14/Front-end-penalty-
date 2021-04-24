import React from 'react'

import { Upload, Modal,Form, Button} from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import axiosURL from '../../config/axiosURL';

function getBase64(file) {
  console.log(file);
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}


 export class Uploads extends React.Component {
  state = {
    previewVisible: false,
    previewImage: '',
    previewTitle: '',
    fileList: [
      
    ],
  };

  handleCancel = () => this.setState({ previewVisible: false });

  handlePreview = async file => {
    console.log(file);
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
      previewTitle: file.name || file.url.substring(file.url.lastIndexOf('/') + 1),
    });
  };

  handleChange = ({ fileList }) =>  {
    console.log(fileList);
    this.setState({ fileList });
  }
  handleSubmit= async (values)=>{
    console.log(values);
    let f = new FormData();
    f.append("imagen",this.state.fileList);
   let result = await axiosURL.put(`/rendicion/gastos/${2}`, f)
  }
  render() {
    const { previewVisible, previewImage, fileList, previewTitle } = this.state;
    const uploadButton = (
      <div>
        <PlusOutlined />
        <div style={{ marginTop: 8 }}>Upload</div>
      </div>
    );
    return (
      <>
      <Form onFinish={this.handleSubmit}>
        <Form.Item name='imagen'>
        <Upload
          action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
          listType="picture-card"
          fileList={fileList}
          onPreview={this.handlePreview}
          onChange={this.handleChange}
        >
          {fileList.length >= 8 ? null : uploadButton}
        </Upload>
        <Modal
          visible={previewVisible}
          title={previewTitle}
          footer={null}
          onCancel={this.handleCancel}
        >
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
        
        </Form.Item>
        <Form.Item>
        <Button htmlType="submit"> Enviar</Button>
        </Form.Item>
        </Form>
      </>
    );
  }
}
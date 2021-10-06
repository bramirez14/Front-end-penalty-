import React,{useState} from 'react'
import { Upload, Button, Form } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { axiosURL } from '../config/axiosURL';

export const Prueba =() =>{
    const [state, setState] = useState( {
    fileList: [],
    uploading: false,
  })

  const handleUpload = async () => {
    const { fileList } = state;
    console.log(fileList);
    const formData = new FormData();
      formData.append('file', fileList[0]);

    setState({
      uploading: true,
    });
      const res= await axiosURL.post('/tarjeta/credito',formData);
console.log(res);
        /* success: () => {
          setState({
            fileList: [],
            uploading: false,
          });
          message.success('upload successfully.');
        },
        error: () => {
          setState({
            uploading: false,
          });
          message.error('upload failed.');
        }, */
        setState({
            uploading: false,
          });
      }
  

   
    const { uploading, fileList } = state;
    const props = {
      onRemove: file => {
          console.log(file,'line51');
        setState(state => {
            console.log(state,'line53');
          const index = state.fileList.indexOf(file);
          const newFileList = state.fileList.slice();
          newFileList.splice(index, 1);
          return {
            fileList: newFileList,
          };
        });
      },
      beforeUpload: file => {
        setState(state => ({

          fileList: [...state.fileList, file],
        }));
        return false;
      },
      fileList,
    };
    console.log(state,'line 71');
    return (
      
     <>
        <Upload {...props}
        name='file'  listType="picture" maxCount={1} accept=".jpg, .jpeg, .png, .pdf, .jfif" 
        >
          <Button icon={<UploadOutlined />}>Select File</Button>
        </Upload>
        <Button
          type="primary"
          onClick={handleUpload}
          loading={uploading}
          style={{ marginTop: 16 }}
        >
          {uploading ? 'Uploading' : 'Start Upload'}
        </Button>
        </>
    );
  
}

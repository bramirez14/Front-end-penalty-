import React,{useState,useEffect} from 'react'
import './avatar.css'
import { TiUserAdd } from "react-icons/ti";
import { PeticionJWT } from '../../auth/PeticionJWT';
import axiosURL from '../../config/axiosURL';

import { Form, Input, Button, Modal,Avatar} from 'antd';
import { UserOutlined } from '@ant-design/icons';

export const AvatarImg = ({sidebar}) => {

    const [state, setState] = useState({loading:false,visible:false});
    const { visible, loading } = state;
    const showModal = () => {
        setState({...state,visible:true});
      };
      
  const handleOk = () => {
    setState({...state,loading:true});
    setTimeout(() => {
        setState({...state,visible:false,loading:false})
    }, 3000);
  };
  const handleCancel = () => {
  setState({ visible: false });
  };

    const id = localStorage.getItem('uid')
    const [avatar, setAvatar] = useState([])
    const [img, setImg] = useState()
    const peticion= PeticionJWT();
    const {nombre,apellido} = peticion;
    const handleFileChange = (e) => {
        let file = e.target.files[0];
        handFiles(file);
    };
    const handFiles = (file) => {
        let imageArr = [];

        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.addEventListener("load", () => {
            let fileObj = {
                name: file.name,
                type: file.type,
                size: file.size,
                src: reader.result,
            };
            imageArr.push(fileObj);
            setAvatar(imageArr);
            setImg(file);//guardamos el archivo imagen

        });
    };
  
         const crearImg = async () => {
            handleOk();
            let d = new FormData();
            d.append("imagen", img);
            let res = await axiosURL.put(`/${id}`,d)
            console.log(res.data);
        }
  
    return (
        <>
        <Form >
        <div className={avatar.length<=0?'div-img':'div-img-active'}>
     
            <TiUserAdd className= 'avatar'  onClick={showModal} />
            
           
        
        </div>
        <div className='persona'> <span className='personaje'>{ nombre } { apellido }</span></div>
       
        <Modal
        style={{marginleft:'100px',}}
          visible={visible}
          title="Subi aca  tu imagen Favorita "
          onOk={handleOk}
          onCancel={handleCancel}
          footer={[
            <Button key="back" onClick={handleCancel}>
              Salir
            </Button>,
            <Button key="submit" type="primary" loading={loading} onClick={crearImg}>
              Subir
            </Button>,
            
          ]}
        >
            <div className='contendor-modal'>
  <div class="button-wrapper">
  <span class="label">
    Upload File
  </span>
  
    <input type="file" name="upload" id="upload" class="upload-box" placeholder="Upload File" onChange={handleFileChange}/>
   
</div>
<div style={{border:'solid 1px #ddd',width:'200px',height:'200px',margin:'auto'}}>
    <img  style={{width:'200px',height:'200px',margin:'auto',padding:'20px'}} src={avatar[0]?.src} alt="" />
    </div>
</div>
     
        </Modal>

        </Form>
        </>
     
      
    )
}

import React,{useState} from 'react'
import { Modal, Button,Form,Input} from 'antd';
import { Archivo } from '../../file/Archivo';
import { axiosURL } from '../../config/axiosURL';
import Swal from 'sweetalert2'
export const Modale = ({id}) => {
  console.log(id);
  const [state, setState] = useState({
    loading: false,
    visible: false,
  });
  const [stateForm, setStateForm] = useState({
    norden: '',
    file:'',
  })
  const {norden,file}=stateForm;

  const showModal = () => {
    setState({
      visible: true,
    });
  };

  const handleOk = () => {
    setState({ loading: true });
    setTimeout(() => {
      setState({ loading: false, visible: false });
    }, 3000);
  };

  const handleCancel = () => {
    setState({ visible: false });
  };

  const handleChange = (e) => {
const {name,value}=e.target;

setStateForm({...stateForm,[name]:value})
  };

  const handleChangeFile = (e) => {
    console.log(e.target.files[0]);
    setStateForm({
      ...stateForm, file:e.target.files[0]
    })
      };
const handleSubmit= async()=> {

if(norden===''){
  Swal.fire({
    icon: 'error',
    title: 'Oops...',
    text: 'Ingresa un N° de orden!',
  })
}else if(file===''){
  Swal.fire({
    icon: 'error',
    title: 'Oops...',
    text: 'Ingresa un archivo pdf!',
  })
}else{
  handleOk();
  let f = new FormData();
  f.append("norden",norden);
  f.append("file",file);
  const {data} = await axiosURL.post(`/archivo/pdf/${id}`,f);
  if(data==='ok')
  setStateForm({norden:'',file:''})
}
}
console.log(stateForm);
  const { visible, loading } = state;
    return (
        <>
        
        <Button type="primary" onClick={showModal}  
        style={{ marginTop: 20 ,float:'right'}}>
        Subir Archivo
      </Button>
      <Modal
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Salir
          </Button>,
          
          <Button key="submit"  type="primary" loading={loading} onClick={handleSubmit}>
            Enviar
          </Button>
        ]}
      >
         <div className='container'> 
      <Form layout="vertical">
        <Form.Item  >
          <Input name='norden' onChange={handleChange} placeholder='N de orden' value={norden} />
        </Form.Item>  
        <Form.Item>
           <Archivo change={handleChangeFile}/>
          </Form.Item>
          <Form.Item label={file.name}/>
        </Form>
        </div>
      </Modal>

     
      
    </>
    )
}

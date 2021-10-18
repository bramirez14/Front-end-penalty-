import React,{ useState,useContext} from 'react'
import { Files } from '../../helpers/Files';
import { Row, Col, Form, Input, DatePicker, Button, Modal } from "antd";
import { SocketContext } from "../../context/SocketContext";
import { PeticionGET } from '../../config/PeticionGET';
import { axiosURL } from '../../config/axiosURL';

export const FilesKm = ({idDB,totalKmDB,importeTotalDB,history,setSpinner}) => {
    const { socket } = useContext(SocketContext);
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();
 const id = localStorage.getItem('uid');
 const datosUsuario = PeticionGET(`/${id}`);

  const handleSubmit = async (values) => {
    setSpinner(true);
    setVisible(false);
    const objs={
        alerta:'Se visiualizaran en la descripcion',
        info:'Tenes un Rendicion de Kilometro',
       nombre:`${datosUsuario.nombre} ${datosUsuario.apellido}`,
       f: new Date().toLocaleString(),
       estado:'activa',
        path:'/aprobacion/km',
        emisor:datosUsuario.email,
        receptor:datosUsuario.gerente.email,
        usuarioId:datosUsuario.id
       }
  socket.emit('alerta-nueva',objs)

const f= new FormData();
     f.append('imagen',values.file[0].originFileObj)
      for (const d of idDB) {
        f.append('id',d)
      }
     f.append('kmTotal',totalKmDB)
     f.append('importeTotal',importeTotalDB)
     f.append('usuarioId',id)
     f.append('f',new Date().toLocaleString())

    const resp= await axiosURL.post('/km',f);
    console.log(resp);
    if(resp.data.status===200){
      history.push('/lista/kilometros')
    }
     setSpinner(false);
  }
    return (
        <>
        <Button
        onClick={() => {
          setVisible(true);
        }}
      >
        Confirmar 
      </Button>
        <Modal
        visible={visible}
        title="Confirmar Operacion"
        okText="Guardar"
        cancelText="Cancelar"
        onCancel={() => {
          setVisible(false);
        }}
        onOk={() => {
          form
            .validateFields()
            .then((values) => {
              form.resetFields();
              handleSubmit(values);
            })
            .catch((info) => {
              console.log("Validate Failed:", info);
            });
        }}
      >
        <Form
          form={form}
          size="large"
          layout="vertical"
          name="form_in_modal"
          gutter={20}
        >

            <Files />

        </Form>
        </Modal>
        </>
    )
}
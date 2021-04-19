import React, { useState } from "react";
import { Table,  Button, Col, Modal, Form, Input, Upload, message } from "antd";
import axiosURL from "../../config/axiosURL";
import axios from 'axios'
import { VscCallIncoming } from "react-icons/vsc";
export const Tabla = ({
  categoria,
  descripcion,
  notas,
  importe,
  array,
  datos,
}) => {
  console.log(datos);
  const [visible, setVisible] = useState(false);
  const [visibleEditar, setVisibleEditar] = useState(false)
  const [loading, setLoading] = useState(false);
  const [muestra, setMuestra] = useState({
    importe:'',
    notas:'',
    categoria:'',
    imagen:''
  })
  const showModal = () => setVisible(true);
  const showModalEditar = () => setVisibleEditar(true);

  const handleChange=e=>{
    const {name, value}=e.target;
    setMuestra({...muestra,
    [name]: value});
    
  }
  /***imagen */
const handleImage = (e) => {
  //console.log(e.target.files[0]);
  setMuestra({
    ...muestra,
    imagen: e.target.files[0],
  });
};
/**fin imagen  */

  const handleOk = () => {
    setLoading(true);
    setTimeout(() => {
      setVisible(false);
      setLoading(false);
    }, 2000);
  };
  const handleOkEditar = () => {
    setLoading(true);
    editarRendicion()
    setTimeout(() => {
      setVisibleEditar(false);
      setLoading(false);
    }, 2000);
  };
  const handleCancel = () => setVisible(false);
  const handleCancelEditar = () => setVisibleEditar(false);
  const seleccionarRendicionAEditar=(fila)=>{
    setMuestra(fila)
  showModalEditar();
  }

  

  const columns = [
    {
      title: "Item",
      dataIndex: "item",
      key: "item",
    },
    {
      title: "Categorias",
      dataIndex: "categoria",
      key: "categoria",
    },
    {
      title: "Notas",
      dataIndex: "notas",
      key: "notas",
    },
    {
      title: "Importe",
      dataIndex: "importe",
      key: "importe",
    },
    {
      title: "Imagen",
      dataIndex: "imagen",
   
  
    },
    {
      title: "Acciones",
      dataIndex: "acciones",
      key:'acciones',
      render: (f,fila) => (
        <>
        <Button  style={{width:'auto' ,borderColor:'#1890ff',borderRadius:'7px'}}  onClick={()=>seleccionarRendicionAEditar(fila)}>Agregar Datos</Button> {"   "}
        </>
      ),
    },
  ];
  const data = datos?.map((f, i) => {
    return {
      ...f,
      item: i + 1,
      key: f.id,
      imagen: <img src={f.imagen} alt="" style={{width:'100px',height:'100px'}}/>
      
    };
  });

//console.log(datos[0].imagen);

/** editar la rendicion  */
const editarRendicion = async () => {
  let f= new FormData();
  f.append("imagen", muestra.imagen);
  f.append("importe", muestra.importe);
  f.append("categoria", muestra.categoria);
  f.append("notas", muestra.notas);

 let result =  await axiosURL.put(`/rendicion/gastos/${muestra.id}`,f)
     console.log(result);
   
};
/**fin de editar rendicion  */
//console.log(datos);

  return (
    <Col>
      <Button
        style={{ width: "auto", backgroundColor: "#5cdbd3", marginTop:'10px'}}
        onClick={showModal}
      >
        {" "}
        Ingresar
      </Button>

      <Table
        
        columns={columns}
        dataSource={data}
      />
      {/**Modal para Ingresar una rendicion */}
      <Modal
  destroyOnClose={true}
        title='Ingresar Rendicion'
        onOk={handleOk}
        visible={visible}
        onCancel={handleCancel}
        footer={[
          <Button type="primary" style={{borderRadius:'20px'}} onClick={handleCancel}>
            Cancelar
          </Button>,
          <Button  type="primary"  loading={loading} onClick={handleOk}>
            Ok
          </Button>,
        ]}
      >
        <Form.Item name="categoria">
          <Input placeholder="Categoria" name="categoria" />
        </Form.Item>
        <Form.Item name="descripcion">
          <Input placeholder="Descripcion" name="descripcion" />
        </Form.Item>
        <Form.Item name="notas">
          <Input placeholder="Notas" name="notas" />
        </Form.Item>
        <Form.Item name="importe">
          <Input placeholder="Importe" name="importe" />
        </Form.Item>
      </Modal>

      {/**Modal para Ediar una rendicion */}

      <Modal
  
  title='Rendicion del Anticipo de gasto'
  onOk={handleOkEditar}
  visible={visibleEditar}
  onCancel={handleCancelEditar}
  footer={[
    <Button  onClick={handleCancelEditar}>
      Cancelar
    </Button>,
    <Button  type="primary"  loading={loading} onClick={handleOkEditar}>
      Ok
    </Button>,
   
  
  ]}
>
  <Form layout= 'vertical' 
>
<Form.Item label='Categoria'  >
    <Input name="categoria"  value={muestra&& muestra.categoria} onChange={handleChange}/>
  </Form.Item>


  <Form.Item label='Notas' >
    <Input name="notas"  value={muestra&& muestra.notas} onChange={handleChange} />
  </Form.Item>
  <Form.Item label='Importe'>
    <Input name="importe"  value={muestra&& muestra.importe} onChange={handleChange}/>
  </Form.Item>
<input className='upload' onChange={handleImage} style={{fontSize:'15px' }} type="file" name="imagen" />

  </Form>
</Modal>
    </Col>
  );
};

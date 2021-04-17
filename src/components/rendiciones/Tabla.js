import React, { useState } from "react";
import { Table, Radio, Divider, Button, Col, Modal, Form, Input } from "antd";
export const Tabla = ({
  categoria,
  descripcion,
  notas,
  importe,
  array,
  funcion,
}) => {
  const [selectionType, setSelectionType] = useState("checkbox");
  const [visible, setVisible] = useState(false);
  const [visibleEditar, setVisibleEditar] = useState(false)
  const [loading, setLoading] = useState(false);
  const showModal = () => setVisible(true);
  const showModalEditar = () => setVisibleEditar(true);



  const handleOk = () => {
    setLoading(true);
    setTimeout(() => {
      setVisible(false);
      setLoading(false);
    }, 2000);
  };
  const handleOkEditar = () => {
    setLoading(true);
    setTimeout(() => {
      setVisibleEditar(false);
      setLoading(false);
    }, 2000);
  };
  const handleCancel = () => setVisible(false);
  const handleCancelEditar = () => setVisibleEditar(false);
  const seleccionarRendicionAEditar=(fila)=>{
   console.log(fila);
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
      title: "Acciones",
      dataIndex: "acciones",
      key:'acciones',
      render: (f,fila) => (
        <>
        <Button  onClick={()=>seleccionarRendicionAEditar(fila)}>Editar</Button> {"   "}
        </>
      ),
    },
  ];
  const data = funcion?.map((f, i) => {
    return {
      ...f,
      item: i + 1,
      key: f.id,
    };
  });
  // rowSelection object indicates the need for row selection
  console.log(data);
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(`id: ${selectedRowKeys}`, "datos de la fila: ", selectedRows);
    },
  };
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
        rowSelection={{
          type: selectionType,
          ...rowSelection,
        }}
        columns={columns}
        dataSource={data}
      />
      {/**Modal para Ingresar una rendicion */}
      <Modal
  
        title='Ingresar Rendicion'
        onOk={handleOk}
        visible={visible}
        onCancel={handleCancel}
        footer={[
          <Button  onClick={handleCancel}>
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
    </Col>
  );
};

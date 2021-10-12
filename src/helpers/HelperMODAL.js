import React, { useState } from "react";
import { Modal, Button, Form} from "antd";

export const HelperMODAL = ({
  state,
  setState,
  click=()=>{},
  noclick =()=>{},
  children,
  boton,
  block,
  style,
  title,
  Submit,
  Return,
  longModal
}) => {
  const [visible, setVisible] = useState(false);
  const showModal = () => setVisible(true);
  const handleCancel = () => {
    setVisible(false);
    noclick()
  }
  const handleOk = () => {
    setVisible(false);
    click();
  };
  const handleX= () =>setVisible(false);

  return (
    <>
      <Button block={block} style={style} onClick={showModal}>
        {boton}
      </Button>
      <Modal
        visible={visible}
        title={title}
        onOk={handleOk}
        onCancel={handleX}
        width={longModal}
        footer={[
          <Button key="back" onClick={handleCancel}>
            {Return}
          </Button>,
            <Form.Item >
          <Button key="submit" type="primary" onClick={handleOk} style={{backgroundColor:'#46a461',boxShadow:'#46a461',border:'#46a461'}} htmlType="submit">
            {Submit}
          </Button></Form.Item>,
        ]}
      >
        {children}
      </Modal>
    </>
  );
};

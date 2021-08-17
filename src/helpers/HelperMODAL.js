import React, { useState } from "react";
import { Modal, Button } from "antd";

export const HelperMODAL = ({
  state,
  setState,
  click,
  noclick,
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

  return (
    <>
      <Button block={block} style={style} onClick={showModal}>
        {boton}
      </Button>
      <Modal
        visible={visible}
        title={title}
        onOk={handleOk}
        onCancel={handleCancel}
        width={longModal}
        footer={[
          <Button key="back" onClick={handleCancel}>
            {Return}
          </Button>,
          <Button key="submit" type="primary" onClick={handleOk}>
            {Submit}
          </Button>,
        ]}
      >
        {children}
      </Modal>
    </>
  );
};

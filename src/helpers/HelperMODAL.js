import React, { useState } from "react";
import { Modal, Button } from "antd";
import Swal from "sweetalert2/dist/sweetalert2.js";

export const HelperMODAL = ({
  state,
  setState,
  click,
  children,
  boton,
  block,
  style,
  title,
  Submit,
  Return,
  history,
}) => {
  const [visible, setVisible] = useState(false);
  const showModal = () => setVisible(true);
  const handleCancel = () => setVisible(false);
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

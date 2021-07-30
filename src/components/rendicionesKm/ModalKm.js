import React, { useState } from "react";
import { Modal, Button } from 'antd';

export const ModalKm = ({state,setState,click,children,boton,block,style,title,Submit,Return,history}) => {

  const [visible, setVisible] = useState(false);
  const showModal = () => setVisible(true);
  const handleOk = () =>{ setVisible(false);
        click()
        
}
  const handleCancel = () => setVisible(false);
 
  return(
      <>
    <Button block={block}  style={style} onClick={showModal}>
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
      <Button key="submit" type="primary" onClick={handleOk} >
       {Submit}
      </Button>,
    ]}
  >
    {children}
    
  </Modal>
  </>
  )
};

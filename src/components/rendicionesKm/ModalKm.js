import React, { useState } from "react";
import { Modal, Button } from 'antd';
import { Imagen } from "../img/Imagen";

export const ModalKm = ({state,setState,click}) => {
const [data, setData] = useState([]);
  const [visible, setVisible] = useState(false);
  const showModal = () => setVisible(true);
  const handleOk = () =>{ setVisible(false);
        click()
}
  const handleCancel = () => setVisible(false);
 
  return(
      <>
    <Button   block style={{borderRadius:10,background:'#46a461',border:'none',boxShadow:'none',color:'#ffff'}} type="primary" onClick={showModal}>
   Confirmar
  </Button>
    <Modal
    visible={visible}
    title="Finalizar"
    onOk={handleOk}
    onCancel={handleCancel}
    footer={[
      <Button key="back" onClick={handleCancel}>
       Salir
      </Button>,
      <Button key="submit" type="primary" onClick={handleOk}>
        Guardar
      </Button>,
    ]}
  >
      <div style={{display:'flex',flexWrap:'nowrap'}}>
      <Imagen ancho={'200px'}
       setData={setData} state={state} setState={setState}
      />
      <div
              style={{
                border: "solid 1px #ddd",
                width: "200px",
                height: "200px",
                margin: "auto",
              }}
            >
              <img
                style={{
                  width: "200px",
                  height: "200px",
                  margin: "auto",
                  padding: "20px",
                }}
                src={data[0]?.src}
                alt=""
              />
            </div>
            </div>
  </Modal>
  </>
  )
};

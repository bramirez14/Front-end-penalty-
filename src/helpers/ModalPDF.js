import React,{useState} from "react";
import Pdf from "react-to-pdf";
import { Modal, Button } from 'antd';

export const ModalPDF=({children,ref})=>{
  console.log(ref);
 const [isModalVisible, setIsModalVisible] = useState(false);
const t=()=>setIsModalVisible(false)
    
    const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
return (
    <>
         <Button type="primary" onClick={showModal}>
        PDF
      </Button>
      <Modal title="Basic Modal" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}
        footer={[
            <Button key="back" onClick={handleCancel}>
              Return
            </Button>,
       
          <Pdf targetRef={ref} filename="code-example.pdf">
        {({ toPdf }) => 
          <button onClick={toPdf}> <div onClick={t}>Generar Pdf</div></button>
        }
      </Pdf>
          ]}
      
      >
       <div ref={ref}>
         <h1>hi people</h1>
        {children}
      </div>
    
       </Modal>
     </>
  );

}
  


 

  




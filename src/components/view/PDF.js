import React,{useState} from 'react'
import {PeticionGET} from '../../config/PeticionGET';
import { Encabezado } from '../rendiciones/Encabezado'
import { SubEncabezado } from '../rendiciones/SubEncabezado'
import { Col, Row, Table, Tag, Space, Modal, Button  } from "antd";
import Pdf from "react-to-pdf";
import './pdf.css'
const ref = React.createRef();

export const PDF = ({match}) => {
 /*  const { id } = match.params; */
  const peticionGastoId = PeticionGET(`/gastos/${72}`);
  const todasLasRendiciones = peticionGastoId?.rendicion;
  const sumaGastos = todasLasRendiciones?.map((sg) => sg.importe);
  let totalDeImporte;
  if (sumaGastos?.length > 0) {
    totalDeImporte = sumaGastos?.reduce((acumulador, item) => {
      return (acumulador = parseFloat(acumulador) + parseFloat(item));
    });
  }
  const filas = todasLasRendiciones?.map((f, i) => {
    return {
      ...f,
      key: f.id,
    };
  });
  /**Modal */
  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState('Content of the modal');

  const showModal = () => {
    setVisible(true);
    countDown()
  };
  const handleOk = () => {

    setModalText('The modal will be closed after two seconds');
    setConfirmLoading(true);
    setTimeout(() => {
      setVisible(false);
      setConfirmLoading(false);
    }, 2000);
  };
  const handleCancel = () => {
    console.log('Clicked cancel button');
    setVisible(false);
  };

  const columns = [
    {
      title: 'N° de Rendicion ',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Fecha',
      key: 'fecha',
      dataIndex: 'fecha',

    },
    {
      title: 'Categoria',
      dataIndex: 'categoria',
      key: 'categoria',
    },
    {
      title: 'Importe',
      dataIndex: 'importe',
      key: 'importe',
      render: (t, record) => (
        <p>
          ${record.importe}
        </p>)
    },
    {
      title: 'Imagen',
      key: 'imagen',
      render: (text, record) => (
        <Space size="middle">
          <img src={record.imagen} alt="" style={{ width: '70px', height: '70px' }} />
        </Space>
      ),
    },
  ];
  function countDown() {
    let secondsToGo = 5;
    const modal = Modal.success({
      title: 'This is a notification message',
      content: `This modal will be destroyed after ${secondsToGo} second.`,
    });
    const timer = setInterval(() => {
      secondsToGo -= 1;
      modal.update({
        content: `This modal will be destroyed after ${secondsToGo} second.`,
      });
    }, 1000);
    setTimeout(() => {
      clearInterval(timer);
      modal.destroy();
    }, secondsToGo * 1000);
  }


  return (
    <>
      <Button type="primary" onClick={showModal} style={{marginTop:'20px'}} >
      PDF
      </Button>
      <Modal
        title="Comprobante"
        visible={visible}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        width={850}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Cancel
          </Button>,
        
           <Pdf targetRef={ref} filename="code-example.pdf" key="submit"  >
           {({ toPdf }) =>  <Button onClick={toPdf} type="primary" > Generate PDF</Button> }
         </Pdf>
         
         
        ]}
      >
        
        
       <div style={{ width: 'auto', background: '#fff', borderRadius: '20px' }} ref={ref}>
        <Encabezado />
        <SubEncabezado
         
        />
        <Table columns={columns} dataSource={filas} pagination={false} />
        
        <h4 style={{textAlign:'end'}}>Total: ${totalDeImporte}</h4>
      </div>

      </Modal>


    </>
  )
}

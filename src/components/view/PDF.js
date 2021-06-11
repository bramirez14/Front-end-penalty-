import React from 'react'
import PeticionGET from '../../config/PeticionGET';
import { Encabezado } from '../rendiciones/Encabezado'
import { SubEncabezado } from '../rendiciones/SubEncabezado'
import {  Col, Row,Table, Tag, Space } from "antd";
import Pdf from "react-to-pdf";
import './pdf.css'
const ref = React.createRef();

export const PDF = ({match }) => {
    const { id } = match.params;
    const peticionGastoId = PeticionGET(`/gastos/${id}`);
  const todasLasRendiciones = peticionGastoId?.rendicion;
  const sumaGastos = todasLasRendiciones?.map((sg) => sg.importe);
  let totalDeImporte;
  if (sumaGastos?.length > 0) {
    totalDeImporte = sumaGastos?.reduce((acumulador, item) => {
      return (acumulador = parseFloat(acumulador) + parseFloat(item));
    });
  }
  console.log(todasLasRendiciones);
  const filas = todasLasRendiciones?.map((f, i) => {
    return {
      ...f,
      key: f.id,
    };
  });
  const columns = [
    {
      title: 'N° de Rendicion ',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Tags',
      key: 'tags',
      dataIndex: 'tags',
    
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
          <a>Invite {record.name}</a>
          <a>Delete</a>
        </Space>
      ),
    },
  ];
  
    return (
        <>
        <div style={{width: 'auto',background:'#fff',borderRadius:'20px'}} className='container' ref={ref}>
        <Encabezado/>
        <SubEncabezado
        uuid={id}
        total={totalDeImporte}
        />
          <Table columns={columns} dataSource={filas} />

        </div>

<Pdf targetRef={ref} filename="code-example.pdf">
{({ toPdf }) => <button onClick={toPdf}>Generate Pdf</button>}
</Pdf>
</>
    )
}

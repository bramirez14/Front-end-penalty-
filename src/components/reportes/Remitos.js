import React from 'react';
import { Button} from 'antd';
import { PeticionGETIntranet } from '../../config/PeticionGET';
import { axiosURLIntranet } from '../../config/axiosURL';
import { saveAs } from "file-saver";
import { Tabla } from '../helper/Tabla';
export const Remitos = ()=> {
  /**Trae los remitos de la DB */
    const todosRemitos = PeticionGETIntranet('/remitos')
  /**Las Columnas */
    const columns = [
      {
          title: 'N° de Cliente',
          dataIndex: 'cliente',
          key: 'cliente',
      },
      {
        title: 'Nombre y Apellido',
        dataIndex: 'apeynom',
        key: 'apeynom',
        width: '30%',
      },
      {
        title: 'N° de vendedor',
        dataIndex: 'vendedor',
        key: 'vendedor',
        width: '30%',
      },
      {
        title: 'N° de Pedido',
        dataIndex: 'PEDIDO',
        key: 'PEDIDO',
        width: '30%',
      },
      {
        title: 'Unidades',
        dataIndex: 'UNIDADES',
        key: 'UNIDADES',
      },
      {
        title: 'Fecha de Emision',
        dataIndex: 'fecemision',
        key: 'fecemision',
        width: '200px',
        render: (estado, file) => {
            let reducir=file.fecemision.split('T');
            return( <p>{reducir[0]}</p>)
        }
      },
      {
        title: 'N° de Remito',
        dataIndex: 'REMITO',
        key: 'REMITO',
        width: '30%',
      },
      {
        title: 'Razon Social',
        dataIndex: 'razonsoc',
        key: 'razonsoc',
        width: '200px',
      },
      {
        title: 'Estado',
        dataIndex: 'ESTADO',
        key: 'ESTADO',
        width: '30%',
        render: (estado, file) => {
            const color = () => {
              switch (file.ESTADO) {
                case "PENDIENTE":
                  return <p style={{ color: "#F3D726" }}> <b>PENDIENTE...</b> </p>;
                case "DESPACHADO":
                  return <p style={{ color: "green" }}> DESPACHADO </p>;
                default:
                  return <p style={{ color: "red" }}> EN PREPARACION </p>;
              }
            };
            return <>{color()}</>;
          },
      },
      {
        title: 'PDF',
        dataIndex: 'pdf',
        key: 'pdf',
        render:(a,file)=>{
          const descargarPDF= async ( pdf)=>{
            console.log(pdf);
            let res=await axiosURLIntranet.get('/remitos/pdf',{
              headers: {archivo:pdf},
              responseType: "blob"
            });
            console.log(res);
            const pdfBlob = await new Blob([res.data], { type: "application/pdf" });
            saveAs(pdfBlob, `${file.pdf}`);
          }
          return(<Button onClick={()=>descargarPDF(file.pdf)}>pdf</Button>)
          }
      },
    ];
    /**Tabla */
    return <Tabla columnas={columns} data={todosRemitos} />
}

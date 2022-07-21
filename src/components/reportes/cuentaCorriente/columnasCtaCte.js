import { Button } from "antd";
import { axiosURLIntranet } from "../../../config/axiosURL";
import { saveAs } from "file-saver";
import { numberWithCommas } from "../helpers/funciones";

export const columnasCtaCte=[
   
      {
        title: 'Cliente',
        dataIndex: 'CLIENTE',
        key: 'CLIENTE',
        width:100,
        render:(state,file)=> <h5>{file.CLIENTE}</h5>,
        
      },
       {
        title: 'Razon Social',
        dataIndex: 'RAZONSOC',
        key: 'RAZONSOC',
        width:170,
        render:(state,file)=> <h5>{file.RAZONSOC}</h5>,
      },
      {
        title: 'Vdor',
        dataIndex: 'VENDEDOR',
        key: 'VENDEDOR',
        width:100,

        render:(state,file)=> <h5>{file.VENDEDOR}</h5>,
        
      },
      {
        title: 'Nombre',
        dataIndex: 'APEYNOM',
        key: 'APEYNOM',
        width:160,

        render:(state,file)=> <h5>{file.APEYNOM}</h5>,
      },
      {
        title: 'Fecha',
        dataIndex: 'FECEMISION',
        key: 'FECEMISION',
        width:140,
        render:(state,file)=>{
          const fecha = file.FECEMISION.split('T')[0];
         return <h5>{fecha}</h5>
        },
      },
      {
        title: 'Vto',
        dataIndex: 'FECVENC',
        key: 'FECVENC',
        width:120,
        render:(state,file)=> {
          const fecha = file.FECVENC.split('T')[0];
         return <h5>{fecha}</h5>
        },
      }, 
      {
        title: 'Cabeza',
        dataIndex: 'CABEZA',
        key: 'CABEZA',
        width:140,

        render:(state,file)=> <h5>{file.CABEZA}</h5>,
      },
      {
        title: 'Cod Cabeza',
        dataIndex: 'CODCABEZA',
        key: 'CODCABEZA',
        width:100,

        render:(state,file)=> <h5>{file.CODCABEZA}</h5>,
      },
      {
        title: 'Aplicado',
        dataIndex: 'APLICADO',
        key: 'APLICADO',
        width:140,

        render:(state,file)=> <h5>{file.APLICADO}</h5>,
      },
      {
        title: 'Codaplicado',
        dataIndex: 'CODAPLICAD',
        key: 'CODAPLICAD',
        width:140,

        render:(state,file)=> <h5>{file.CODAPLICAD}</h5>,
      },
      {
        title: 'Total',
        dataIndex: 'TOTALML',
        key: 'TOTALML',
        width:120,

        render:(state,file)=> <h5>${numberWithCommas(file.TOTALML)}</h5>,
      },
       {
        title: 'Saldo',
        dataIndex: 'SALDOML',
        key: 'SALDOML',
        width:120,

        render:(state,file)=> <h5>${numberWithCommas(file.SALDOML)}</h5>,
      },
      {
        title: 'pdf',
        dataIndex: 'pdf',
        key: 'pdf',
        width:120,
        render: (a, file) => {
          const descargarPDF = async (pdf) => {
            let res = await axiosURLIntranet.get("/remitos/pdf/comprobantes", {
              headers: { archivo: pdf },
              responseType: "blob",
            });
            const pdfBlob = await new Blob([res.data], { type: "application/pdf" });
            saveAs(pdfBlob, `${file.pdf}`);
          };
          return <Button type='link' onClick={() => descargarPDF(file.pdf)}>descargar</Button>;
        },
      }, 
      
      

]
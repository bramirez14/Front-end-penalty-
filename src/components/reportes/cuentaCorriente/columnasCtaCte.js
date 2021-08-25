import { Button } from "antd";
import { axiosURLIntranet } from "../../../config/axiosURL";
import { saveAs } from "file-saver";
import { numberWithCommas } from "../helpers/funciones";

export const columnasCtaCte=[
   
      {
        title: 'Cliente',
        dataIndex: 'cliente',
        key: 'cliente',
        width:100,
        render:(state,file)=> <h5>{file.cliente}</h5>,
        
      },
      {
        title: 'Razon Social',
        dataIndex: 'razonsoc',
        key: 'razonsoc',
        width:170,
        render:(state,file)=> <h5>{file.razonsoc}</h5>,
      },
      {
        title: 'Vdor',
        dataIndex: 'vendedor',
        key: 'vendedor',
        width:100,

        render:(state,file)=> <h5>{file.vendedor}</h5>,
        
      },
      {
        title: 'Nombre',
        dataIndex: 'apeynom',
        key: 'apeynom',
        width:160,

        render:(state,file)=> <h5>{file.apeynom}</h5>,
      },
      {
        title: 'Fecha',
        dataIndex: 'fecemision',
        key: 'fecemision',
        width:140,
        render:(state,file)=>{
          const fecha = file.fecemision.split('T')[0];
         return <h5>{fecha}</h5>
        },
      },
      {
        title: 'Vto',
        dataIndex: 'fecvenc',
        key: 'fecvenc',
        width:120,
        render:(state,file)=> {
          const fecha = file.fecvenc.split('T')[0];
         return <h5>{fecha}</h5>
        },
      }, 
      {
        title: 'Cabeza',
        dataIndex: 'cabeza',
        key: 'cabeza',
        width:140,

        render:(state,file)=> <h5>{file.cabeza}</h5>,
      },
      {
        title: 'Cod Cabeza',
        dataIndex: 'codcabeza',
        key: 'codcabeza',
        width:100,

        render:(state,file)=> <h5>{file.codcabeza}</h5>,
      },
      {
        title: 'aplicado',
        dataIndex: 'aplicado',
        key: 'aplicado',
        width:140,

        render:(state,file)=> <h5>{file.aplicado}</h5>,
      },
      {
        title: 'codaplicado',
        dataIndex: 'codaplicad',
        key: 'codaplicad',
        width:140,

        render:(state,file)=> <h5>{file.codaplicad}</h5>,
      },
      {
        title: 'Total',
        dataIndex: 'totalml',
        key: 'totalml',
        width:120,

        render:(state,file)=> <h5>${numberWithCommas(file.totalml)}</h5>,
      },
       {
        title: 'Saldo',
        dataIndex: 'saldoml',
        key: 'saldoml',
        width:120,

        render:(state,file)=> <h5>${numberWithCommas(file.saldoml)}</h5>,
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
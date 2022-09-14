//import { axiosURLIntranet } from "../../../config/axiosURL";
import { numberWithCommas } from "../helpers/funciones";

export const columnasCtaCteProv=[
   
    {
        title: 'Proveedor',
        dataIndex: 'PROVEEDOR',
        key: 'PROVEEDOR',
        lupa:true,
        render:(state,file)=> <h5>{file.PROVEEDOR}</h5>,
      },
       {
        title: 'Razon Social',
        dataIndex: 'RAZONSOC',
        key: 'RAZONSOC',
        lupa:true,
        render:(state,file)=> <h5>{file.RAZONSOC}</h5>,
      },
      {
        title: 'Cod Cabeza',
        dataIndex: 'CODCABEZA',
        key: 'CODCABEZA',
        lupa:true,
        render:(state,file)=> <h5>{file.CODCABEZA}</h5>,
      },
      {
        title: 'Cabeza',
        dataIndex: 'CABEZA',
        key: 'CABEZA',
      lupa:true,
        render:(state,file)=> <h5>{file.CABEZA}</h5>,
      },
      {
        title: 'Fecha',
        dataIndex: 'FECEMISION',
        key: 'FECEMISION',
      lupa:true,
        render:(state,file)=>{
          const fecha = file.FECEMISION.split('T')[0];
         return <h5>{fecha}</h5>
        },
      },
      {
        title: 'Vto',
        dataIndex: 'FECVENC',
        key: 'FECVENC',
        lupa:true,
        render:(state,file)=> {
          const fecha = file.FECVENC.split('T')[0];
         return <h5>{fecha}</h5>
        },
      }, 
      {
        title: 'Dias',
        dataIndex: 'Dias',
        key: 'Dias',
        render:(state,file)=> <h5>{file.Dias}</h5>,
      },
      {
        title: 'Moneda',
        dataIndex: 'MONEDAORIG',
        key: 'MONEDAORIG',
      render:(state,file)=> <h5>{file.MONEDAORIG}</h5>,
      },
      {
        title: 'Saldo',
        dataIndex: 'Saldo',
        key: 'Saldo',
        render:(state,file)=> <h5>{file.Saldo}</h5>,
      },
      {
        title: 'Total',
        dataIndex: 'TOTALML',
        key: 'TOTALML',
        render:(state,file)=> <h5>${numberWithCommas(file.TOTALML)}</h5>,
      },
      {
        title: 'TotalME',
        dataIndex: 'TOTALME',
        key: 'TOTALME',
        render:(state,file)=> <h5>${numberWithCommas(file.TOTALME)}</h5>,
      },
       {
        title: 'Saldo',
        dataIndex: 'SALDOME',
        key: 'SALDOME',
        render:(state,file)=> <h5>${numberWithCommas(file.SALDOME)}</h5>,
      },
     /*  {
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
      },  */

]
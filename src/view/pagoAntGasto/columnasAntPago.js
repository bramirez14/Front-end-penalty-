import { Button, Table } from "antd";
import { saveAs } from "file-saver";
import { axiosURL } from "../../config/axiosURL";
import { BiDownload } from 'react-icons/bi';
import { numberWithCommas } from "../../components/reportes/helpers/funciones";

const descargarPDF = async (pdf) => {
    let res = await axiosURL.get("/pdf/gastos/rendicion", {
      headers: { archivo: pdf },
      responseType: "blob",
    });
    const pdfBlob = await new Blob([res.data], { type: "application/pdf" });
    saveAs(pdfBlob, `${pdf}`);
  };
export const columnsant = [
    {
        title: "N de Ant Gasto",
        dataIndex: "id",
        key: "id",
        width:100,
        render: (state, file) =><h5>{file.id}</h5>

      },
      {
        title: "Nombre",
        dataIndex: "nombre",
        key: "nombre",
        width:100,
        render: (state, file) =><h5>{file.nombre}</h5>


      },
      {
        title: "Apellido",
        dataIndex: "apellido",
        key: "apellido",
        width:140,
        render: (state, file) =><h5>{file.apellido}</h5>

      },
  
      {
        title: "Fecha",
        dataIndex: "fecha",
        key: "fecha",
        width:120,
        render: (state, file) =><h5>{file.fecha}</h5>

      },
  
   
      {
        title: "Rendicion",
        key: "sinAnticipo",
        dataIndex: "sinAnticipo",
        width:120,

        render: (state, file) => (
          <>
            {file.sinAnticipo === "sin" ? (
              <h5>Sin Anticipo </h5>
            ) : (
              <h5>Con Anticipo</h5>
            )}
          </>
        ),
      },
      {
        title: "Importe solicitado",
        dataIndex: "importerendido",
        key: "importerendido",
        width: 170,
        render: (state, file) => (
            <>
          {file.sinAnticipo === "sin" ? 
           <h5 style={{color:'orange'}}>Sin importe</h5>
         :
            <h5>${numberWithCommas(file.importe)}</h5>
          }
          </>
        ),
      },
      {
        title: "Importe rendido",
        dataIndex: "importerendido",
        key: "importerendido",
        width: 170,
        lupa: false,
        render: (state, file) => <h5> ${numberWithCommas(file.importerendido)} </h5>
      },
  
      {
        title: "Estado",
        dataIndex: "estadoFinal",
        key: "estadoFinal",
        width:120,
        render: (state, file) =><h5>{file.estadoFinal}</h5>

      },
      {
        title: "N orden",
        dataIndex: "norden",
        key: "norden",
        width:140,
        render: (state, file) =><h5>{file.norden}</h5>

      },
      {
        title: "PDF Proveedores",
        dataIndex: "pdf",
        key: "pdf",
        width:140,

        render: (state, file) => {
          return (
            <>
              {file.pdf === null || file.pdf === "" ? (
                <h5>No hay pdf</h5>
              ) : (
                <Button type="link" onClick={() => descargarPDF(file.pdf)}>
                  <BiDownload/>
                </Button>
              )}
            </>
          );
        },
      },
      {
        title: "PDF Pagos",
        dataIndex: "pdfinal",
        key: "pdfinal",
        width:100,

        render: (state, file) => {
          return (
            <>
              {file.pdfinal === null || file.pdfinal === "" ? (
                <h5>No hay pdf</h5>
              ) : (
                <Button type="link" onClick={() => descargarPDF(file.pdfinal)}>
                  <BiDownload/>
                </Button>
              )}
            </>
          );
        },
      },
      {
        title: "  PDF Orden pago final ",
        dataIndex: "pdfpagoFinal",
        key: "pdfpagoFinal",
        width:170,
        render: (state, file) => {
          return (
            <>
              {file.pdfpagoFinal === null || file.pdfpagoFinal === "" ? (
                <h5>No hay pdf</h5>
              ) : (
                <Button type="link" onClick={() => descargarPDF(file.pdfpagoFinal)} >
                  <BiDownload />
                </Button>
              )}
            </>
          );
        },
      },

]
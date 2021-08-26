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

      },
      {
        title: "Nombre",
        dataIndex: "nombre",
        key: "nombre",
        width:100,

      },
      {
        title: "Apellido",
        dataIndex: "apellido",
        key: "apellido",
        width:140,

      },
  
      {
        title: "Fecha",
        dataIndex: "fecha",
        key: "fecha",
        width:120,

      },
  
      {
        title: "Importe",
        key: "importerendido",
        dataIndex: "importerendido",
        width:140,

        render: (state, file) => <span> ${numberWithCommas(file.importe)}</span>,
      },
      {
        title: "Modalidad",
        key: "sinAnticipo",
        dataIndex: "sinAnticipo",
        width:120,

        render: (state, file) => (
          <>
            {file.sinAnticipo === "sin" ? (
              <span>Sin Anticipo </span>
            ) : (
              <span>Con Anticipo</span>
            )}
          </>
        ),
      },
  
      {
        title: "Estado",
        dataIndex: "estadoFinal",
        key: "estadoFinal",
        width:100,

      },
      {
        title: "N orden",
        dataIndex: "norden",
        key: "norden",
        width:140,

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
                <span>No hay pdf</span>
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
                <span>No hay pdf</span>
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
                <span>No hay pdf</span>
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
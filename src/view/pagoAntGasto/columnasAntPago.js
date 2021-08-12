import { Button, Table } from "antd";
import { saveAs } from "file-saver";
import { axiosURL } from "../../config/axiosURL";
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
        width: "80px",
      },
      {
        title: "Nombre",
        dataIndex: "nombre",
        key: "nombre",
      },
      {
        title: "Apellido",
        dataIndex: "apellido",
        key: "apellido",
      },
  
      {
        title: "Fecha",
        dataIndex: "fecha",
        key: "fecha",
      },
  
      {
        title: "Importe",
        key: "importerendido",
        dataIndex: "importerendido",
        render: (state, file) => <span> ${file.importerendido}</span>,
      },
      {
        title: "Modalidad",
        key: "sinAnticipo",
        dataIndex: "sinAnticipo",
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
      },
      {
        title: "N orden",
        dataIndex: "norden",
        key: "norden",
      },
      {
        title: "PDF Proveedores",
        dataIndex: "pdf",
        key: "pdf",
        render: (state, file) => {
          return (
            <>
              {file.pdf === null || file.pdf === "" ? (
                <span>No hay pdf</span>
              ) : (
                <Button type="link" onClick={() => descargarPDF(file.pdf)}>
                  descargar
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
        render: (state, file) => {
          return (
            <>
              {file.pdfinal === null || file.pdfinal === "" ? (
                <span>No hay pdf</span>
              ) : (
                <Button type="link" onClick={() => descargarPDF(file.pdfinal)}>
                  descargar
                </Button>
              )}
            </>
          );
        },
      },

]
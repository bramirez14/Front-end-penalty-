import { Button } from "antd";
import { axiosURLIntranet } from "../../../config/axiosURL";
import { saveAs } from "file-saver";
import { numberWithCommas } from "../helpers/funciones";

export const columnasCtaCte = [
  {
    title: "Cliente",
    dataIndex: "CLIENTE",
    key: "CLIENTE",
    lupa: true,
    render: (_, file) => <h5>{file.CLIENTE}</h5>,
  },
  {
    title: "Razon Social",
    dataIndex: "RAZONSOC",
    key: "RAZONSOC",
    lupa: true,
    with: 150,
    render: (_, file) => <h5>{file.RAZONSOC}</h5>,
  },
  {
    title: "Vdor",
    dataIndex: "VENDEDOR",
    key: "VENDEDOR",
    lupa: true,
    render: (_, file) => <h5>{file.VENDEDOR}</h5>,
  },
  {
    title: "Nombre",
    dataIndex: "APEYNOM",
    key: "APEYNOM",
    lupa: true,
    render: (_, file) => <h5>{file.APEYNOM}</h5>,
  },
  {
    title: "Fecha",
    dataIndex: "FECEMISION",
    key: "FECEMISION",
    lupa: true,
    with: 120,
    render: (_, file) => {
      const fecha = file.FECEMISION.split("T")[0];
      return <h5>{fecha}</h5>;
    },
  },
  {
    title: "Vto",
    dataIndex: "FECVENC",
    key: "FECVENC",
    lupa: true,
    with: 120,
    render: (_, file) => {
      const fecha = file.FECVENC.split("T")[0];
      return <h5>{fecha}</h5>;
    },
  },
  {
    title: "Cabeza",
    dataIndex: "CABEZA",
    key: "CABEZA",
    lupa: true,
    render: (_, file) => <h5>{file.CABEZA}</h5>,
  },
  {
    title: "Cod Cabeza",
    dataIndex: "CODCABEZA",
    key: "CODCABEZA",
    lupa: true,
    render: (_, file) => <h5>{file.CODCABEZA}</h5>,
  },
  {
    title: "Aplicado",
    dataIndex: "APLICADO",
    key: "APLICADO",
    lupa: true,
    render: (_, file) => <h5>{file.APLICADO}</h5>,
  },
  {
    title: "Codaplicado",
    dataIndex: "CODAPLICAD",
    key: "CODAPLICAD",
    lupa: true,
    render: (_, file) => <h5>{file.CODAPLICAD}</h5>,
  },
  {
    title: "Total",
    dataIndex: "TOTALML",
    key: "TOTALML",
    render: (_, file) => <h5>${numberWithCommas(file.TOTALML)}</h5>,
  },
  {
    title: "Saldo",
    dataIndex: "SALDOML",
    key: "SALDOML",
    render: (_, file) => <h5>${numberWithCommas(file.SALDOML)}</h5>,
  },
  {
    title: "pdf",
    dataIndex: "pdf",
    key: "pdf",
    render: (_, file) => {
      console.log(file);
      const descargarPDF = async (pdf) => {
        let res = await axiosURLIntranet.get("/remitos/pdf/comprobantes", {
          headers: { archivo: pdf },
          responseType: "blob",
        });
        console.log(res);
        const pdfBlob = await new Blob([res.data], { type: "application/pdf" });
        saveAs(pdfBlob, `${pdf}`);
      };
      return (
        <Button
          type="link"
          onClick={() =>
            descargarPDF(
              `CC${file.CLIENTE}-${file.NROINTERNO}-${file.CODAPLICAD}`
            )
          }
        >
          CC{file.CLIENTE}-{file.NROINTERNO}-{file.CODAPLICAD}
        </Button>
      );
    },
  },
];

import { Tag } from "antd";
import { numeroConComa } from "../../../helpers/funcioneshelpers";

export const columnasGastos = [
  {
    title: "N de Ant",
    dataIndex: "id",
    key: 1,
  },
  {
    title: "fecha de Solicitud  ",
    dataIndex: "fecha",
    key:2
  },
  {
    title: "Con o sin Ant",
    dataIndex: "sinAnticipo",
    render: (state, file) =>
      file.sinAnticipo === "sin" ? <p>Sin Anticipo</p> : <p>Con Anticipo</p>,
      key:3
  },
  {
    title: "Importe",
    dataIndex: "importe",
    render: (state, file) => <p>${numeroConComa(file.importe)}</p>,
    key:4
  },

  {
    title: "Mensaje de Grencia",
    dataIndex: "respMensaje",
    key:5
  },
  {
    title: "Estado",
    dataIndex: "estadoFinal",
    render: (state, file) =>
      file.estadoFinal === "aprobado" ? (
        <Tag color="green">{file.estadoFinal}</Tag>
      ) : file.estadoFinal === "pendiente" ? (
        <Tag color="gold">{file.estadoFinal}</Tag>
      ) : (
        <Tag color="red">{file.estadoFinal}</Tag>
      ),
      key:6
  },
];

import { Button } from "antd/lib/radio";
import { BiDownload } from "react-icons/bi";
import { PeticionGET } from "../../../config/PeticionGET";
import { descargarPDF } from "../../helpers/funciones";
var numberFormat = new Intl.NumberFormat("es-ES");
export const colGastos = [
  
  {
    title: "N° de anticipo",
    dataIndex: "id",
    key: "id",
    width: 100,
    render: (state, file) => <h5>{file.id}</h5>,
  },
  {
    title: "Nombre",
    dataIndex: "nombre",
    key: "nombre",
    width: 100,

    render: (state, file) => <h5>{file.nombre}</h5>,
  },
  {
    title: "Apellido",
    dataIndex: "apellido",
    key: "apellido",
    width: 100,

    render: (state, file) => <h5>{file.apellido}</h5>,
  },
  {
    title: "Dto",
    dataIndex: "departamento",
    key: "departamento",
    width: 100,
    render: (estado, file) => {
      const dtos = PeticionGET("/departamentos"); // peticion get para traer todos los departamentos
      const Dto = dtos.find((d) => d.id === file.usuario?.departamentoId);
      const DtoSelect = Dto?.departamento;
      return <h5>{DtoSelect}</h5>;
    },
  },

{
    title: "Estado",
    dataIndex: "estado",
    key: "estado",
    width: 90,
    lupa: false,
    render: (estado, file) => {
      const color = () => {
        switch (file.estado) {
          case "pendiente":
            return <h5 style={{ color: '#F79E0B' }}> pendiente...</h5>;
          case "aprobado":
            return <h5 style={{ color: "green" }}> aprobado </h5>;
          default:
            return <h5 style={{ color: "red" }}> rechazado </h5>;
        }
      };
      return <>{color()}</>;
    },
  },
 
];

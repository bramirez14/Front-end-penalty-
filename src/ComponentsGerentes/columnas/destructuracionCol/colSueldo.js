import { PeticionGET } from "../../../config/PeticionGET";
var numberFormat = new Intl.NumberFormat("es-ES");

export const colSueldo = [
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
      const dtos = PeticionGET("/departamentos");
      const Dto = dtos.find((d) => d.id === file.usuario?.departamentoId);
      const DtoSelect = Dto?.departamento;
      return <h5 style={{ marginLeft: "10px" }}>{DtoSelect}</h5>;
    },
  },
  {
    title: "Devolucion",
    dataIndex: "sueldo",
    key: "sueldo",
    width: 140,

    lupa: false,

    render: (state, file) => <h5>{file.sueldo}</h5>,
  },
  {
    title: "Cuotas",
    dataIndex: "cuotas",
    key: "cuotas",
    render: (state, file) => <h5>{file.cuotas}</h5>,
  },
  {
    title: "Importe",
    dataIndex: "importe",
    key: "importe",
    width: 100,
    lupa: false,
    render: (state, file) => <h5>{numberFormat.format(file.importe)}</h5>,
  },
  {
    title: "Fecha de Solicitud",
    dataIndex: "fecha",
    key: "fecha",
    width: 200,

    render: (state, file) => <h5>{file.fecha}</h5>,
  },
  {
    title: "Mensaje",
    dataIndex: "mensaje",
    key: "mensaje",
    width: 100,
    lupa: false,

    render: (state, file) => <h5>{file.mensaje}</h5>,
  },
  {
    title: "Estado",
    dataIndex: "estado",
    key: "estado",
    width:100,
    lupa: false,
    render: (estado, file) => {
      const color = () => {
        switch (file.estado) {
          case "pendiente":
            return <h5 style={{ color: '#F79E0B'  }}> pendiente...</h5>;
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

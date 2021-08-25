import { PeticionGET } from "../../../config/PeticionGET";
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
    title: "Forma de Pago",
    dataIndex: "formapagoId",
    width: 200,
    key: "formapagoId",
    render: (state, file) => {
      const formaDepago = PeticionGET("/mpagos");

      const buscarMediodePago = formaDepago.find(
        (f) => f.id === file.formapagoId
      );
      const pago = buscarMediodePago?.pago;
      return <h5>{pago}</h5>;
    },
  },

  {
    title: "Importe",
    dataIndex: "importe",
    key: "importe",
    width: 100,
    lupa: false,
    render: (state, file) => (
      <>
        {file.sinAnticipo === "sin" ? (
          <h5>${numberFormat.format(file.importerendido)}</h5>
        ) : (
          <h5>${numberFormat.format(file.importe)}</h5>
        )}
      </>
    ),
  },
  {
    title: "Devolucion",
    dataIndex: "importerendido",
    key: "importerendido",
    width: 140,
    lupa: false,
    render: (state, file) => (
      <>
        {file.sinAnticipo === "sin" ? (
          ""
        ) : file.importe < file.importerendido ? (
          <h5 style={{ color: "red" }}>
            {" "}
            ${numberFormat.format(file.importerendido)}{" "}
          </h5>
        ) : (
          <h5 style={{ color: "green" }}>
            ${numberFormat.format(file.importerendido)}{" "}
          </h5>
        )}
      </>
    ),
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
    dataIndex: "notas",
    key: "notas",
    width: 100,
    lupa: false,
    render: (state, file) => <h5>{file.notas}</h5>,
  },
  {
    title: "Rendicion",
    dataIndex: "sinAnticipo",
    key: "sinAnticipo",
    width: 140,

    render: (state, file) => (
      <>
        {file.sinAnticipo === "sin" ? (
          <h5> Sin Anticipo </h5>
        ) : (
          <h5> Con Anticipo </h5>
        )}
      </>
    ),
  },

  {
    title: "Estado",
    dataIndex: "estado",
    key: "estado",
    width: 100,
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
